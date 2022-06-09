#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

use rocket::fs::{relative, FileServer, NamedFile};
use rocket::response::content;

#[get("/<_..>", rank = 255)]
async fn catch_all() -> Option<NamedFile> {
    NamedFile::open(relative!("client/build/index.html"))
        .await
        .ok()
}

#[get("/", rank = 5)]
async fn api_toy() -> content::RawJson<&'static str> {
    content::RawJson("{ \"message\": \"Hello from the server!\" }")
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![catch_all])
        .mount("/", FileServer::from(relative!("client/build")).rank(10))
        .mount("/api", routes![api_toy])
}
