pub mod startup;
pub mod api;

use std::{sync::OnceLock, collections::HashMap};

use axum::{
    response::IntoResponse, extract::Path, http::Response}
;

pub const STATIC_DIR: &str = "./client/static";
pub static FILES: OnceLock<HashMap<String, String>> = OnceLock::new();

enum ContentType {
    Markdown,
    JavaScript,
    Wasm,
    Ttf,
    Html,
    Png,
    Jpg,
    NotFound,
    Redirect,
}

impl From<ContentType> for &'static str {
    fn from(content_type: ContentType) -> Self {
        match content_type {
            ContentType::Markdown => "text/markdown",
            ContentType::JavaScript => "text/javascript",
            ContentType::Wasm => "application/wasm",
            ContentType::Ttf => "font/ttf",
            ContentType::Html => "text/html",
            ContentType::Png => "image/png",
            ContentType::Jpg => "image/jph",
            ContentType::NotFound => "not found",
            ContentType::Redirect => "redirect",
        }
    }
}

impl ContentType {
    fn from_ext(extension: &str) -> Option<Self> {
        match extension {
            "md" => Some(ContentType::Markdown),
            "js" => Some(ContentType::JavaScript),
            "wasm" => Some(ContentType::Wasm),
            "ttf" => Some(ContentType::Ttf),
            "html" => Some(ContentType::Html),
            "png" => Some(ContentType::Png),
            "jpg" => Some(ContentType::Jpg),
            _ => None,
        }
    }
}

enum Content {
    Plain(String),
    Markdown(String),
    Wasm(Vec<u8>),
    JavaScript(String),
    Ttf(Vec<u8>),
    Bytes(Vec<u8>),
    Html(String),
    Png(Vec<u8>),
    Jpg(Vec<u8>),
    NotFound,
    Redirect(String),
}

impl IntoResponse for Content {
    fn into_response(self) -> axum::response::Response {
        match self {
            Content::JavaScript(t) => {
                Response::builder()
                    .header("Content-Type", "text/javascript")
                    .body(t.into())
                    .unwrap()
            }
            Content::Markdown(t) => {
                Response::builder()
                    .header("Content-Type", "text/markdown")
                    .body(t.into())
                    .unwrap()
            }
            Content::Plain(t) =>  {
                Response::builder()
                    .header("Content-Type", "text/plain")
                    .body(t.into())
                    .unwrap()
            }
            Content::Bytes(b) => {
                Response::builder()
                    .header("Content-Type", "application/octet-stream")
                    .body(b.into())
                    .unwrap()
            },
            Content::Wasm(b) => {
                Response::builder()
                    .header("Content-Type", "application/wasm")
                    .body(b.into())
                    .unwrap()
            }
            Content::Ttf(b) => {
                Response::builder()
                    .header("Content-Type", "font/ttf")
                    .body(b.into())
                    .unwrap()
            }
            Content::Html(t) => {
                Response::builder()
                    .header("Content-Type", "text/html")
                    .body(t.into())
                    .unwrap()
            }
            Content::Png(b) => {
                Response::builder()
                    .header("Content-Type", "image/png")
                    .body(b.into())
                    .unwrap()
            }
            Content::Jpg(b) => {
                Response::builder()
                    .header("Content-Type", "image/jpg")
                    .body(b.into())
                    .unwrap()
            }
            Content::NotFound => {
                Response::builder()
                    .status(404)
                    .body("Not found".into())
                    .unwrap()
            }
            Content::Redirect(uri) => {
                Response::builder()
                    .status(301)
                    .header("Location", uri)
                    .body("Redirecting".into())
                    .unwrap()
            }
        }
    }
}

pub async fn static_file(Path(uri): Path<String>) -> impl IntoResponse {
    let Some(files) = FILES.get() else {
        panic!("An error occurred! FILES should be loaded by now!");
    };

    if let Some(redirect_uri) = files.get(&uri) {
        return Content::Redirect(redirect_uri.to_string());
    };

    let path = std::path::PathBuf::from(STATIC_DIR).join(uri);
    let extension = path.extension().unwrap().to_str().unwrap();

    let content_type = ContentType::from_ext(extension).unwrap_or({
        ContentType::NotFound
    });

    tracing::info!("Serving file: {:?}", path);

    match content_type {
        ContentType::Markdown => {
            Content::Markdown(std::fs::read_to_string(path).unwrap())
        }
        ContentType::JavaScript => {
            Content::JavaScript(std::fs::read_to_string(path).unwrap())
        }
        ContentType::Wasm => {
            Content::Wasm(std::fs::read(path).unwrap())
        }
        ContentType::Ttf => {
            Content::Ttf(std::fs::read(path).unwrap())
        }
        ContentType::Html => {
            Content::Html(std::fs::read_to_string(path).unwrap())
        }
        ContentType::NotFound => {
            Content::NotFound
        }
        ContentType::Png => {
            Content::Png(std::fs::read(path).unwrap())
        }
        ContentType::Jpg => {
            Content::Jpg(std::fs::read(path).unwrap())
        }
        ContentType::Redirect => {
            unreachable!();
            // Content::Redirect("".to_string())
        }
    }
}
