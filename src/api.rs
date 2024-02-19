use axum::Json;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct Highscore {
    name: [char; 3],
    score: u32,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct Highscores {
    highscores: Vec<Highscore>,
}

pub fn get_snake_highscores() -> Json<String> {

    let mut out = vec![];
    let mut rdr = csv::Reader::from_path("./snake_highscores.csv").unwrap();
    for result in rdr.deserialize() {
        let record: Highscore = result.unwrap();
        out.push(record);
    }

    let highscores = Highscores { highscores: out };

    Json(serde_json::to_string(&highscores).unwrap())
}
