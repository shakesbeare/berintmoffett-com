use anyhow::Result;
use axum::{
    response::{Html, IntoResponse},
    routing::get,
    routing::post,
};
use dotenv::dotenv;
use tower_http::trace::TraceLayer;

use berintmoffett_com::{static_file, STATIC_DIR};

#[tokio::main]
async fn main() -> Result<()> {
    #[cfg(debug_assertions)]
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::TRACE)
        .init();
    #[cfg(not(debug_assertions))]
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::WARN)
        .init();
    tracing::info!("Downloading files...");
    berintmoffett_com::startup::startup().await;

    dotenv().ok();

    let address = std::env::var("ADDRESS").expect("ADDRESS must be set");
    let port = std::env::var("PORT").expect("PORT must be set");

    let listener = tokio::net::TcpListener::bind(format!("{}:{}", address, port))
        .await
        .expect("Failed to bind port");

    let app = axum::Router::new()
        .layer(TraceLayer::new_for_http())
        .route("/index.bundle.js", get(bundle))
        .route("/main.css", get(style))
        .route("/static/*uri", get(static_file))
        .route(
            "/api/snake-highscores",
            get(berintmoffett_com::api::get_snake_highscores)
                .post(berintmoffett_com::api::post_new_highscore),
        )
        .route("/api/snake-leaderboard", get(berintmoffett_com::api::snake_leaderboard))
        .route("/api/update-package/:package_name", post(berintmoffett_com::api::update_package))
        .route("/", get(root))
        .route("/*key", get(root));

    tracing::info!("Ready!");
    tracing::info!("Listening on http://{}:{}", address, port);

    axum::serve(listener, app).await.unwrap();

    Ok(())
}

async fn root() -> Html<String> {
    tracing::info!("ROOT");
    let path = std::path::PathBuf::from(STATIC_DIR).join("index.html");
    std::fs::read_to_string(path).unwrap().into()
}

async fn bundle() -> impl IntoResponse {
    let path = std::path::PathBuf::from(STATIC_DIR).join("index.bundle.js");
    let file = std::fs::read_to_string(path).unwrap();

    axum::http::Response::builder()
        .header("Content-Type", "text/javascript")
        .body(file)
        .unwrap()
}

async fn style() -> impl IntoResponse {
    let path = std::path::PathBuf::from(STATIC_DIR)
        .join("css")
        .join("main.css");
    let file = std::fs::read_to_string(path).unwrap();

    axum::http::Response::builder()
        .header("Content-Type", "text/css")
        .body(file)
        .unwrap()
}
