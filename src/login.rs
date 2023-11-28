use leptos::*;
use leptos_router::{ActionForm, FromFormData};

use crate::auth::{User, UserLogin};

#[component]
pub fn UserDisplay() -> impl IntoView {
    let user = expect_context::<ReadSignal<User>>();

    let login_status =
        expect_context::<Resource<User, Result<User, ServerFnError>>>();

    view! {
        <span class="nav-item navbar-text justify-content-right px-2">
            "Logged in, " {move || {
                login_status.refetch();
                user().name()
            }}
        </span>
    }
}

#[component]
pub fn LoginNavBar() -> impl IntoView {
    let login = create_server_action::<UserLogin>();
    let set_user = expect_context::<WriteSignal<User>>();

    view! {
        <ActionForm
            action=login
            class="form-inline justify-content-right text-right"
        >

            {move || {
                let Some(Ok(user)) = login.value().get() else { return };
                set_user(user);
            }}

            <div class="input-group input-group-sm">
                <input
                    type="text"
                    name="username"
                    autocomplete="username"
                    class="pr-3 form-control"
                    placeholder="Username"
                    aria-label="Username"
                />
                <input
                    type="password"
                    name="password"
                    autocomplete="current-password"
                    class="pr-3 form-control"
                    placeholder="Password"
                    aria-label="Password"
                />
                <input class="btn btn-primary" type="submit" value="Login"/>
            </div>
        </ActionForm>
    }
}
