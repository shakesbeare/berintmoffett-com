pub mod snake;

use anyhow::Result;
use std::{fs::File, path::Path, sync::{Arc, OnceLock}};

use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};

static POOL: OnceLock<Arc<Pool<Sqlite>>> = OnceLock::new();

pub async fn init() -> Result<()> {
    let pool = match Path::new("./database.db").exists() {
        true => {
            SqlitePoolOptions::new()
                .max_connections(5)
                .connect("sqlite://./database.db")
            .await?
        },
        false => {
            let _ = File::create("./database.db")?;
            let pool = SqlitePoolOptions::new()
                .max_connections(5)
                .connect("sqlite://./database.db")
            .await?;

            sqlx::query(r#"
            CREATE TABLE snake_leaderboard (
                name TEXT PRIMARY KEY NOT NULL,
                score INTEGER NOT NULL
            )
            "#)
                .execute(&pool).await?;

            sqlx::query(r#"
            INSERT INTO snake_leaderboard (name, score)
            VALUES ('aaa', 0),
                     ('bbb', 0),
                     ('ccc', 0),
                     ('ddd', 0),
                     ('eee', 0)
            "#).execute(&pool).await?;

            pool
        }
    };

    let Ok(_) = POOL.set(Arc::new(pool)) else {
        panic!("Could not set database pool!");
    };
    Ok(())
}

