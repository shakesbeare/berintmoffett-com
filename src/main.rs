mod utils;

#[macro_use]
extern crate rocket;

use crate::utils::{get_all_posts, Response};
use rocket::fs::{relative, FileServer, NamedFile};
use rocket::serde::json::Json;
use rocket::tokio::fs::File;
use rocket::tokio::io::AsyncReadExt;
use std::env;

#[get("/<_..>", rank = 255)]
async fn catch_all() -> Option<NamedFile> {
    NamedFile::open(relative!("client/build/index.html"))
        .await
        .ok()
}

#[get("/<post_name>", rank = 5)]
async fn get_post(post_name: &str) -> Result<Json<Response>, ()> {
    let cwd = env::current_dir().unwrap();
    let path_to_file = format!("client/build/posts/{}", &post_name);
    let path = cwd.join(path_to_file);

    let named_file = NamedFile::open(&path).await.ok();

    match named_file {
        Some(mut file) => {
            let file: &mut File = file.file_mut();
            let mut buf: std::string::String = "".to_string();
            file.read_to_string(&mut buf).await.unwrap();
            let response = Response::new(&buf);
            Ok(Json(response))
        }
        None => {
            let response = Response::new(
                format!("File `{}` not found or is inaccessible", &post_name).as_str(),
            );
            println!("File `{}` not found or is inaccessible", &path.display());
            Ok(Json(response))
        }
    }
}

#[get("/list", rank = 1)]
async fn list_posts() -> Result<Json<Response>, ()> {
    Ok(Json(Response::new(
        format!("{:?}", get_all_posts()).as_str(),
    )))
}

#[launch]
fn rocket() -> _ {
    println!("{:?}", get_all_posts());
    rocket::build()
        .mount("/", routes![catch_all])
        .mount("/posts", routes![get_post, list_posts])
        .mount("/", FileServer::from(relative!("client/build")).rank(10))
}
