use std::collections::HashMap;
use std::str::FromStr;

use axum::http::Response;
use axum::Json;
use axum::response::IntoResponse;
use reqwest::Method;

use crate::database::snake::LeaderboardEntry;


#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Highscores {
    highscores: Vec<LeaderboardEntry>,
}

pub async fn get_snake_highscores() -> Response<String> {
    let out = crate::database::snake::get_highscores().await.unwrap();

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

pub async fn snake_leaderboard() -> Response<String> {
    let out = crate::database::snake::get_all_scores().await.unwrap();
    let highscores = Highscores { highscores: out };

    let json = serde_json::to_string(&highscores).unwrap();
    Response::builder()
        .header("Content-Type", "application/json")
        .header("Access-Control-Allow-Origin", "*")
        .body(json)
        .unwrap()
}

#[derive(serde::Deserialize)]
struct ReleaseResponse {
    assets: Vec<Asset>
}

#[derive(serde::Deserialize)]
struct Asset {
    browser_download_url: String
}

pub async fn snake_update() -> impl IntoResponse {
    let client = reqwest::Client::new();
    let url = reqwest::Url::from_str(  "https://api.github.com/repos/shakesbeare/rust-snake/releases/latest").unwrap();
    let request = reqwest::Request::new(Method::GET, url);
    let req = reqwest::RequestBuilder::from_parts(client, request).header("User-Agent", "berintmoffett-com-Updater").build().unwrap();
    let client = reqwest::Client::new();
    let res = client.execute(req).await.unwrap();
    let res: ReleaseResponse = serde_json::from_str(&res.text().await.unwrap()).unwrap();
    let res = reqwest::get(&res.assets.first().unwrap().browser_download_url).await.unwrap();
    let bytes: Vec<u8> = res.bytes().await.unwrap().into();
    let tar = flate2::read::GzDecoder::new(&bytes as &[u8]);
    let mut archive = tar::Archive::new(tar);
    archive.unpack("./client/static/wasm/rust-snake").unwrap();
}

