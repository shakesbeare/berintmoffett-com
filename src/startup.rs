use std::collections::HashMap;

use crate::STATIC_DIR;
use anyhow::Result;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct File {
    destination_uri: String,
    source_uri: String,
}

pub async fn startup() {
    crate::FILES.get_or_init(|| {
        let files = get_files_list().unwrap();
        let mut map = HashMap::new();
        let _ = files.into_iter().map(|f| {
            let dest = std::path::PathBuf::from(STATIC_DIR).join(&f.destination_uri).to_string_lossy().to_string();
            let redirect_uri = f.source_uri;
            map.insert(dest, redirect_uri);
        });
        map
    });
}

fn get_files_list() -> Result<Vec<File>> {
    let mut out = vec![];
    let mut rdr = csv::Reader::from_path("./files.csv")?;
    for result in rdr.deserialize() {
        let record: File = result?;
        out.push(record);
    }

    Ok(out)
}
