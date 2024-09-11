pub mod snake;

use anyhow::Result;
use std::{
    fs::File,
    path::Path,
    sync::{Arc, OnceLock},
};

use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};

#[derive(sqlx::FromRow, Debug)]
struct Count(i32);

static POOL: OnceLock<Arc<Pool<Sqlite>>> = OnceLock::new();

pub async fn init() -> Result<()> {
    let pool = match Path::new("./database.db").exists() {
        true => {
            SqlitePoolOptions::new()
                .max_connections(5)
                .connect("sqlite://./database.db")
                .await?
        }
        false => {
            let _ = File::create("./database.db")?;
            SqlitePoolOptions::new()
                .max_connections(5)
                .connect("sqlite://./database.db")
                .await?
        }
    };

    ensure_tables(&pool).await.expect("Failed to ensure tables exist");
    POOL.set(Arc::new(pool)).expect("Failed to set DB POOL");

    if is_table_empty("snake_leaderboard").await? {
        let pool = POOL.get().expect("Failed to acquire DB POOL").as_ref();
        sqlx::query(
            r#"
            INSERT INTO snake_leaderboard (name, score)
            VALUES ('aaa', 0),
                   ('bbb', 0),
                   ('ccc', 0),
                   ('ddd', 0),
                   ('eee', 0)
            "#,
        )
        .execute(pool)
        .await?;
    }
    Ok(())
}

/// Ensures that the database has the necessary tables for the app to run
/// This function should ideally be called only before the global `POOL`
/// is initialized.
pub async fn ensure_tables(pool: &Pool<Sqlite>) -> Result<()> {
    sqlx::query(
        r#"
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS snake_leaderboard (
            id INTEGER PRIMARY KEY,
            name TEXT KEY NOT NULL,
            score INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT KEY UNIQUE NOT NULL,
            password TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            date INTEGER NOT NULL,
            author INTEGER REFERENCES users
        );

        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY,
            content TEXT NOT NULL,
            date INTEGER NOT NULL,
            author INTEGER  REFERENCES users,
            post INTEGER REFERENCES posts
        );

        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY,
            uuid TEXT NOT NULL,
            expiry_date INTEGER NOT NULL,
            user INTEGER REFERENCES users
        );
        "#,
    )
    .execute(pool)
    .await?;

    Ok(())
}

pub async fn is_table_empty(table_name: &str) -> Result<bool> {
    let pool = POOL.get().expect("Failed to get handle to DB pool").as_ref();
    let result =
        sqlx::query_as::<_, Count>(&format!("SELECT COUNT(*) FROM {}", table_name))
            .fetch_one(pool)
            .await?;
    tracing::trace!("Table {} has {:?} entries", table_name, result);

    Ok(result.0 == 0)
}
