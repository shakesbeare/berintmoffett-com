use axum::http::Response;
use axum::Json;
use axum::response::IntoResponse;

use crate::database::snake::LeaderboardEntry;


#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Highscores {
    highscores: Vec<LeaderboardEntry>,
}

pub async fn get_snake_highscores() -> Response<String> {
    let out = crate::database::snake::get_highscores().await.unwrap();
    dbg!(&out);

    let highscores = Highscores { highscores: out };
    let json = serde_json::to_string(&highscores).unwrap();

    Response::builder()
        .header("Content-Type", "application/json")
        .header("Access-Control-Allow-Origin", "*")
        .body(json)
        .unwrap()
}

pub async fn post_new_highscore(Json(entry): Json<LeaderboardEntry>) -> impl IntoResponse {
    crate::database::snake::new_leaderboard_entry(entry).await.unwrap();
}
