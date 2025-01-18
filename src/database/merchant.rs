use anyhow::Result;
use merchant_gen_lib::merchant::Merchant;
use sqlx::{Pool, Sqlite};

use super::POOL;

#[derive(
    Debug,
    Eq,
    PartialEq,
    Ord,
    PartialOrd,
    serde::Serialize,
    serde::Deserialize,
    sqlx::FromRow,
)]
struct DbMerchant {
    id: String,
    body: String,
}

#[derive(
    Debug,
    Eq,
    PartialEq,
    Ord,
    PartialOrd,
    serde::Serialize,
    serde::Deserialize,
    sqlx::FromRow,
)]
pub struct MerchantId(String);

impl std::fmt::Display for MerchantId {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0.to_string())
    }
}

impl MerchantId {
    fn increment_id(&self) -> Option<String> {
        let id = self.0.clone();
        // Ensure the ID is valid: 6 characters, all uppercase letters
        if id.len() != 6 || !id.chars().all(|c| c.is_ascii_uppercase()) {
            return None;
        }

        // Convert the string to a mutable character array for manipulation
        let mut chars: Vec<char> = id.chars().collect();

        // Iterate from the last character to the first
        for i in (0..chars.len()).rev() {
            if chars[i] == 'Z' {
                // If the character is 'Z', roll it over to 'A'
                chars[i] = 'A';
            } else {
                // Otherwise, increment the character and stop
                chars[i] = (chars[i] as u8 + 1) as char;
                return Some(chars.iter().collect());
            }
        }

        // If all characters were 'Z', we've reached the end of the sequence
        None
    }
}

/// Insert a new merchant into the database and return the id
/// of the new merchant
pub async fn new_merchant(mut merchant: Merchant) -> Result<String> {
    let pool = POOL.get().unwrap().as_ref();
    merchant.generate_inventory(pool).await?;
    let body = ron::to_string(&merchant)?;
    let next_id = get_next_id(pool).await?;

    sqlx::query(
        "
        INSERT INTO p2e_merchants 
        VALUES ($1, $2);
    ",
    )
    .bind(&next_id.0)
    .bind(body)
    .execute(pool)
    .await?;

    Ok(next_id.0)
}

pub async fn get_next_id(pool: &Pool<Sqlite>) -> Result<MerchantId> {
    let next_id = sqlx::query_as::<_, MerchantId>(
        "
        SELECT * FROM p2e_merchants_id",
    )
    .fetch_one(pool)
    .await?;

    sqlx::query("DELETE FROM p2e_merchants_id WHERE id = $1")
        .bind(&next_id.0)
        .execute(pool)
        .await?;

    sqlx::query("INSERT INTO p2e_merchants_id VALUES ($1)")
        .bind(next_id.increment_id().unwrap())
        .execute(pool)
        .await?;

    Ok(next_id)
}

/// Returns the data for a specific merchant
pub async fn get_merchant<S: AsRef<str>>(id: S) -> Result<Merchant> {
    let pool = POOL.get().unwrap().as_ref();
    let res = sqlx::query_as::<_, DbMerchant>(
        "
    SELECT * FROM p2e_merchants
    WHERE id = $1;
        ",
    )
    .bind(id.as_ref())
    .fetch_one(pool)
    .await?;

    let merchant: Merchant = ron::from_str(&res.body)?;

    Ok(merchant)
}

/// Returns every merchant in the database
pub async fn get_all() -> Result<Vec<Merchant>> {
    let pool = POOL.get().unwrap().as_ref();
    let res = sqlx::query_as::<_, DbMerchant>(
        "
        SELECT * FROM p2e_merchants;
        ",
    )
    .fetch_all(pool)
    .await?;

    Ok(res
        .into_iter()
        .filter_map(|c| ron::from_str(&c.body).ok())
        .collect())
}
