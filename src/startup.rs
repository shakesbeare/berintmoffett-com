use std::future::Future;

use crate::STATIC_DIR;
use anyhow::Result;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct File {
    destination_uri: String,
    source_uri: String,
}

pub async fn startup() -> Result<()> {
    let files = get_files_list();

    let files = match files {
        Ok(f) => f,
        Err(e) => {
            panic!("{:#?}", e);
        }
    };

    let files = files.into_iter().map(|f| {
        let dest = std::path::PathBuf::from(STATIC_DIR).join(&f.destination_uri);
        let handle = tokio::spawn(get_file(f.source_uri));
        (dest, handle)
    });

    let mut res = Vec::with_capacity(files.len());
    for f in files.into_iter() {
        tracing::info!("Downloading {:?}...", &f.0);
        res.push((f.0, f.1.await?));
    }

    for f in res {
        tracing::info!("Writing {:?}...", &f.0);
        let dest = f.0;
        let bytes = f.1?.bytes().await?;

        std::fs::write(dest, bytes)?;
    }

    Ok(())
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

async fn get_file<'a>(
    uri: String,
) -> std::prelude::v1::Result<reqwest::Response, reqwest::Error> {
    reqwest::get(uri).await
}
