use rocket::fs::FileName;
use serde::{Deserialize, Serialize};
use std::env;
use std::fs;

#[derive(Serialize, Deserialize, Debug)]
pub struct Response {
    pub content: std::string::String,
}

impl Response {
    pub fn new(message: &str) -> Self {
        Response {
            content: message.to_string(),
        }
    }
}

pub fn get_all_posts() -> Vec<String> {
    let cwd = env::current_dir().unwrap();
    println!("{}", cwd.display());
    let mut posts: Vec<String> = Vec::new();
    let paths = fs::read_dir("client/build/posts").unwrap();
    for path in paths {
        let path_str = format!("{}", path.unwrap().path().display());
        let name = String::from(FileName::new(&path_str).as_str().unwrap());
        posts.push(name);
    }

    return posts;
}
