use std::str::FromStr;

use axum::{extract::Path, http::Response, response::IntoResponse, Json};
use merchant_gen_lib::merchant::Merchant;
use reqwest::Method;

use crate::database::snake::LeaderboardEntry;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Highscores {
    highscores: Vec<LeaderboardEntry>,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub enum MerchantResponse {
    /// The Markdown representation of a merchant
    Merchant(String),
    Failure(String),
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

pub async fn post_new_highscore(
    Json(entry): Json<LeaderboardEntry>,
) -> impl IntoResponse {
    crate::database::snake::new_leaderboard_entry(entry)
        .await
        .unwrap();
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
    assets: Vec<Asset>,
}

#[derive(serde::Deserialize)]
struct Asset {
    browser_download_url: String,
}

pub async fn update_package(Path(package_name): Path<String>) -> impl IntoResponse {
    tracing::debug!("Attempting to update package `{}`", package_name);
    let url = format!(
        "https://api.github.com/repos/shakesbeare/{}/releases/latest",
        package_name
    );
    let client = reqwest::Client::new();
    let url = reqwest::Url::from_str(&url).unwrap();
    let request = reqwest::Request::new(Method::GET, url);
    let req = reqwest::RequestBuilder::from_parts(client, request)
        .header("User-Agent", "berintmoffett-com-Updater")
        .build()
        .unwrap();
    let client = reqwest::Client::new();
    let res = client.execute(req).await.unwrap();
    let res: ReleaseResponse =
        serde_json::from_str(&res.text().await.unwrap()).unwrap();
    let res = reqwest::get(&res.assets.first().unwrap().browser_download_url)
        .await
        .unwrap();
    let bytes: Vec<u8> = res.bytes().await.unwrap().into();
    let tar = flate2::read::GzDecoder::new(&bytes as &[u8]);
    let mut archive = tar::Archive::new(tar);
    let path = format!("./client/static/wasm/{}", package_name);
    archive.unpack(path).unwrap();
}

pub async fn get_merchant(Path(merchant_id): Path<String>) -> impl IntoResponse {
    tracing::debug!("Getting merchant {}", merchant_id);
    let merchant = crate::database::merchant::get_merchant(&merchant_id).await;

    match merchant {
        Ok(m) => {
            tracing::debug!("Found Merchant {}", merchant_id);
            let json = serde_json::to_string(&MerchantResponse::Merchant(m.markdown()))
                .unwrap();
            Response::builder()
                .header("Content-Type", "application/json")
                .header("Access-Control-Allow-Origin", "*")
                .body(json)
                .unwrap()
        }
        Err(e) => {
            tracing::debug!("Failed to get Merchant {}\n{}", merchant_id, e);
            let json = serde_json::to_string(&MerchantResponse::Failure(e.to_string()))
                .unwrap();
            Response::builder()
                .header("Content-Type", "application/json")
                .header("Access-Control-Allow-Origin", "*")
                .body(json)
                .unwrap()
        }
    }
}

#[axum::debug_handler]
pub async fn create_merchant(Path(level): Path<i32>) -> String {
    crate::database::merchant::new_merchant(Merchant::by_level(level))
        .await.unwrap()
}
