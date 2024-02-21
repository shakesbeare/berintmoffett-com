use axum::http::Response;
use axum::Json;
use axum::{
    response::IntoResponse,
};

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Highscore {
    name: String,
    score: u32,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Highscores {
    highscores: Vec<Highscore>,
}

pub async fn get_snake_highscores() -> Response<String> {

    let mut out = vec![];
    let mut rdr = csv::Reader::from_path("./snake_highscores.csv").unwrap();
    for result in rdr.deserialize() {
        let record: Highscore = result.unwrap();
        out.push(record);
    }

    let highscores = Highscores { highscores: out };
    let json = serde_json::to_string(&highscores).unwrap();

    Response::builder()
        .header("Content-Type", "application/json")
        .header("Access-Control-Allow-Origin", "*")
        .body(json)
        .unwrap()
}

pub async fn post_new_highscore(Json(highscore): Json<Highscore>) -> impl IntoResponse {
    let mut out = vec![];
    let mut rdr = csv::Reader::from_path("./snake_highscores.csv").unwrap();
    for result in rdr.deserialize() {
        let record: Highscore = result.unwrap();
        out.push(record);
    }

    let mut i = 0;
    while i < 5 && highscore.score > out[i].score {
        i += 1;
    }

    out.insert(
        i.into(),
        Highscore {
            name: highscore.name,
            score: highscore.score,
        },
    );
    out = out.into_iter().skip(1).collect();
    
    let mut writer = csv::Writer::from_path("./snake_highscores.csv").unwrap();
    writer.write_record(&["name","score"]);
    for score in out {
        writer.write_record(&[score.name, format!("{}", score.score)]);
    }
}
