use leptos::{*, logging::debug_warn};
use serde::{Deserialize, Serialize};
use thiserror::Error;

use crate::database::{get_user, DatabaseError};

#[derive(Error, Debug)]
pub enum AuthError {
    #[error("Invalid username or password")]
    InvalidUsernameOrPassword,
    #[error("User doesn't exist: {0}")]
    UserDoesntExist(#[from] sqlx::Error),
    #[error("Couldn't acquire connection to pool")]
    ConnectionError(#[from] DatabaseError),
}

#[derive(Clone, Debug, Serialize, Deserialize, Eq, PartialEq)]
pub struct User {
    id: i64,
    username: String,
}

impl Default for User {
    fn default() -> Self {
        User {
            id: -1,
            username: "Not logged in".to_string(),
        }
    }
}

impl From<crate::database::InternalUser> for User {
    fn from(internal: crate::database::InternalUser) -> Self {
        User {
            id: internal.id,
            username: internal.username,
        }
    }
}

impl User {
    pub fn new(id: i64, username: String) -> Self {
        User { id, username }
    }

    async fn from_username(username: String) -> Self {
        let internal_user = get_user(&username).await.unwrap();
        User::from(internal_user)
    }

    async fn authenticate(
        username: String,
        password: String,
    ) -> Result<User, AuthError> {
        let internal_user = get_user(&username).await?;

        if validate_password(password, internal_user.password.clone()) {
            return Ok(User::from(internal_user));
        } else {
            return Err(AuthError::InvalidUsernameOrPassword);
        }
    }

    pub fn name(&self) -> String {
        return self.username.clone();
    }

    pub fn id(&self) -> i64 {
        return self.id;
    }
}

fn validate_password(entered: String, hashed: String) -> bool {
    debug_warn!("Password implementation is currently insecure");
    return entered == hashed;
}

#[server(UserLogin, "/api")]
pub async fn user_login(
    username: String,
    password: String,
) -> Result<User, ServerFnError> {
    use actix_identity::Identity;
    use actix_web::{HttpMessage, HttpRequest};
    use leptos_actix::extract;

    let user: User = User::authenticate(username, password).await?;
    let req = extract(|req: HttpRequest| async move { req }).await?;

    Identity::login(&req.extensions(), user.name()).unwrap();

    return Ok(user);
}

#[server(LoginStatus, "/api")]
pub async fn login_status() -> Result<User, ServerFnError> {
    use actix_identity::Identity;
    use actix_web::{FromRequest, HttpMessage, HttpRequest};
    use leptos_actix::extract;

    let req = extract(|req: HttpRequest| async move { req }).await?;

    let Ok(identity) =
        Identity::from_request(&req, &mut actix_web::dev::Payload::None).await
    else {
        return Err(ServerFnError::ServerError("Not logged in".to_string()));
    };

    return Ok(User::from_username(identity.id().unwrap().to_string()).await);
}
