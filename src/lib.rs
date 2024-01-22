use axum::{
    response::IntoResponse, extract::Path, http::Response}
;

pub const STATIC_DIR: &str = "./client/static";

enum ContentType {
    Markdown,
}

impl From<ContentType> for &'static str {
    fn from(content_type: ContentType) -> Self {
        match content_type {
            ContentType::Markdown => "text/markdown",
        }
    }
}

impl ContentType {
    fn from_ext(extension: &str) -> Option<Self> {
        match extension {
            "md" => Some(ContentType::Markdown),
            _ => None,
        }
    }
}

enum Content {
    Plain(String),
    Markdown(String),
    Bytes(Vec<u8>),
}

impl IntoResponse for Content {
    fn into_response(self) -> axum::response::Response {
        match self {
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
        }
    }
}

pub async fn static_file(Path(uri): Path<String>) -> impl IntoResponse {
    let path = std::path::PathBuf::from(STATIC_DIR).join(uri);
    let extension = path.extension().unwrap().to_str().unwrap();

    let content_type = ContentType::from_ext(extension).unwrap_or_else(|| {
        panic!("Unknown content type for extension: {}", extension)
    });

    match content_type {
        ContentType::Markdown => {
            Content::Markdown(std::fs::read_to_string(path).unwrap())
        }
    }
}
