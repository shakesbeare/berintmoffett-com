use std::collections::HashMap;

use anyhow::Result;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct File {
    destination_uri: String,
    source_uri: String,
}

pub async fn startup() {
    tracing::info!("hello");
    crate::database::init().await.unwrap();
    let files_list = get_files_list().unwrap();
    let mut map = HashMap::new();
    for f in files_list.into_iter() {
        let dest = f.destination_uri;
        let redirect_uri = f.source_uri;
        map.insert(dest, redirect_uri);
    }
    crate::FILES.get_or_init(|| {
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
