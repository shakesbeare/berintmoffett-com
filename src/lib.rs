pub mod api;
pub mod database;
pub mod startup;

use std::{collections::HashMap, sync::OnceLock};

use axum::{extract::Path, http::Response, response::IntoResponse};

pub const STATIC_DIR: &str = "./client/static";
pub static FILES: OnceLock<HashMap<String, String>> = OnceLock::new();

#[derive(Debug)]
enum ContentType {
    Markdown,
    JavaScript,
    Wasm,
    Ttf,
    Html,
    Png,
    Jpg,
    Mpeg,
    Pck,
    NotFound,
    #[allow(dead_code)]
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
            ContentType::Mpeg => "audio/mpeg",
            ContentType::NotFound => "not found",
            ContentType::Redirect => "redirect",
            ContentType::Pck => "application/octet-stream",
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
            "mp3" => Some(ContentType::Mpeg),
            "pck" => Some(ContentType::Pck),
            _ => None,
        }
    }
}

#[allow(dead_code)]
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
    Mpeg(Vec<u8>),
    NotFound,
    Redirect(String),
}

impl IntoResponse for Content {
    fn into_response(self) -> axum::response::Response {
        match self {
            Content::JavaScript(t) => Response::builder()
                .header("Content-Type", "text/javascript")
                .body(t.into())
                .unwrap(),
            Content::Markdown(t) => Response::builder()
                .header("Content-Type", "text/markdown")
                .body(t.into())
                .unwrap(),
            Content::Plain(t) => Response::builder()
                .header("Content-Type", "text/plain")
                .body(t.into())
                .unwrap(),
            Content::Bytes(b) => Response::builder()
                .header("Content-Type", "application/octet-stream")
                .body(b.into())
                .unwrap(),
            Content::Wasm(b) => Response::builder()
                .header("Content-Type", "application/wasm")
                .body(b.into())
                .unwrap(),
            Content::Ttf(b) => Response::builder()
                .header("Content-Type", "font/ttf")
                .body(b.into())
                .unwrap(),
            Content::Html(t) => Response::builder()
                .header("Content-Type", "text/html")
                .body(t.into())
                .unwrap(),
            Content::Png(b) => Response::builder()
                .header("Content-Type", "image/png")
                .body(b.into())
                .unwrap(),
            Content::Jpg(b) => Response::builder()
                .header("Content-Type", "image/jpg")
                .body(b.into())
                .unwrap(),
            Content::Mpeg(b) => Response::builder()
                .header("Content-Type", "audio/mpeg")
                .body(b.into())
                .unwrap(),
            Content::NotFound => Response::builder()
                .status(404)
                .body("Not found".into())
                .unwrap(),
            Content::Redirect(uri) => Response::builder()
                .status(301)
                .header("Location", uri)
                .body("Redirecting".into())
                .unwrap(),
        }
    }
}

pub async fn static_file(Path(uri): Path<String>) -> impl IntoResponse {
    let Some(files) = FILES.get() else {
        panic!("An error occurred! FILES should be loaded by now!");
    };
    tracing::info!("Requested file: {}", uri);

    if let Some(redirect_uri) = files.get(&uri) {
        tracing::info!("Redirecting...");
        return Content::Redirect(redirect_uri.to_string());
    };

    let path = std::path::PathBuf::from(STATIC_DIR).join(uri);
    let extension = path.extension().unwrap().to_str().unwrap();

    let content_type =
        ContentType::from_ext(extension).unwrap_or(ContentType::NotFound);

    tracing::info!("Serving file: {:?} {:?}", path, content_type);

    use ContentType as A;
    match content_type {
        A::Markdown => Content::Markdown(std::fs::read_to_string(path).unwrap()),
        A::JavaScript => Content::JavaScript(std::fs::read_to_string(path).unwrap()),
        A::Wasm => Content::Wasm(std::fs::read(path).unwrap()),
        A::Ttf => Content::Ttf(std::fs::read(path).unwrap()),
        A::Html => Content::Html(std::fs::read_to_string(path).unwrap()),
        A::NotFound => Content::NotFound,
        A::Png => Content::Png(std::fs::read(path).unwrap()),
        A::Jpg => Content::Jpg(std::fs::read(path).unwrap()),
        A::Mpeg => Content::Mpeg(std::fs::read(path).unwrap()),
        A::Pck => Content::Bytes(std::fs::read(path).unwrap()),
        A::Redirect => {
            unreachable!();
            // Content::Redirect("".to_string())
        }
    }
}

pub fn snake_update() -> impl IntoResponse {}
