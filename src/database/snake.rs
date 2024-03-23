use anyhow::Result;

#[derive(sqlx::FromRow, Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct LeaderboardEntry {
    pub name: String,
    pub score: i32,
}

pub async fn new_leaderboard_entry(entry: LeaderboardEntry) -> Result<()> {
    let pool = super::POOL.get().expect("Database pool not initialized").as_ref();
    let _ = sqlx::query(
        r#"
        INSERT INTO snake_leaderboard (name, score)
        VALUES ($1, $2)
        "#,
    )
    .bind(entry.name)
    .bind(entry.score)
    .execute(pool).await?;

    Ok(())
}

pub async fn get_highscores() -> Result<Vec<LeaderboardEntry>> {
    get_top_n_scores(5).await
}

pub async fn get_top_n_scores(n: i32) -> Result<Vec<LeaderboardEntry>> {
    let pool = super::POOL.get().expect("Database pool not initialized").as_ref();
    let mut highscores = sqlx::query_as::<_, LeaderboardEntry>(
        r#"
        SELECT name, score
        FROM snake_leaderboard
        ORDER BY score DESC
        LIMIT $1
        "#,
    )
    .bind(n)
    .fetch_all(pool).await?;

    highscores.sort_by(|a, b| b.score.cmp(&a.score));
    Ok(highscores.into_iter().take(n as usize).collect())
}

pub async fn get_all_scores() -> Result<Vec<LeaderboardEntry>> {
    let pool = super::POOL.get().expect("Database pool not initialized").as_ref();
    let mut highscores = sqlx::query_as::<_, LeaderboardEntry>(
        r#"
        SELECT name, score
        FROM snake_leaderboard
        ORDER BY score DESC
        "#,
    )
    .fetch_all(pool).await?;

    highscores.sort_by(|a, b| b.score.cmp(&a.score));
    Ok(highscores)
}
