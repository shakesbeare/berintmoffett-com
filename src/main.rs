use axum::{
    response::{Html, IntoResponse},
    routing::get,
};
use dotenv::dotenv;
use tower_http::trace::TraceLayer;

use berintmoffett_com::{STATIC_DIR, static_file};

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::DEBUG)
        .init();

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
        .route("/", get(root))
        .route("/*key", get(root));

    axum::serve(listener, app).await.unwrap();
}

async fn root() -> Html<String> {
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
