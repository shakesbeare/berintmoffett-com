
use sqlx::FromRow;
use sqlx::any::AnyPoolOptions;
use sqlx::AnyPool;
use std::sync::Arc;
use thiserror::Error;

use crate::auth::AuthError;

#[derive(Error, Debug)]
pub enum DatabaseError {
    #[error("SqlError: {0}")]
    SqlError(#[from] sqlx::Error),
    #[error("IOError: {0}")]
    IOError(#[from] std::io::Error),
}


#[derive(FromRow)]
pub struct InternalUser {
    pub id: i64,
    pub username: String,
    pub password: String,
}

lazy_static! {
    pub static ref POOL: Arc<AnyPool> = Arc::new(ensure_database_exists().unwrap());
}

pub fn ensure_database_exists() -> Result<AnyPool, DatabaseError> {
    sqlx::any::install_default_drivers();
    use std::path::Path;
    if !Path::new("./database.db").exists() {
        std::fs::File::create("./database.db")?;

        let pool = AnyPoolOptions::new()
            .max_connections(5)
            .connect_lazy("sqlite:./database.db")?;

        return Ok(pool);
    }

    let pool = AnyPoolOptions::new()
        .max_connections(5)
        .connect_lazy("sqlite:./database.db")?;

    return Ok(pool);
}

#[cfg(feature = "ssr")]
pub async fn create_user_tables() -> Result<(), DatabaseError> {
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        "#,
    )
    .execute(&**POOL)
    .await?;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS user_sessions (
            id INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL,
            token TEXT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        "#,
    )
    .execute(&**POOL)
    .await?;

    Ok(())
}

pub async fn get_user(
    username: &str,
) -> Result<InternalUser, AuthError> {
    let user = sqlx::query_as::<_, InternalUser>(
        r#"
        SELECT id, username, password FROM users WHERE username = $1
        "#,
    )
    .bind(username)
    .fetch_one(&**POOL)
    .await?;

    return Ok(InternalUser {
        id: user.id,
        username: user.username,
        password: user.password,
    });
}
