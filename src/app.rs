use leptos::{*, logging::debug_warn};
use leptos_meta::*;
use leptos_router::*;

use crate::{about_me::AboutMe, auth::User, lessons::Lessons, navbar::NavBar};

#[component]
pub fn App() -> impl IntoView {
    let (user, set_user) = create_signal::<User>(User::default());
    let login_status = create_resource(
        || (),
        move |_| async move {
            debug_warn!("Getting login status");
            crate::auth::login_status().await
        },
    );

    provide_context(login_status);
    provide_context(user);
    provide_context(set_user);
    provide_meta_context(); // Provides context that manages stylesheets, titles, meta tags, etc.

    view! {
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
            crossorigin="anonymous"
        />
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
            crossorigin="anonymous"
        ></script>

        <Title text="Berint Moffett - Home"/>
        <Suspense fallback=move || {
            view! { <div class="text-center">"Loading..."</div> }
        }>
            {move || {
                let Some(res) = login_status.get() else { return };
                match res {
                    Ok(user) => {
                        set_user.set(user.clone());
                        provide_context(user);
                    }
                    Err(_) => {
                        set_user.set(User::default());
                    }
                }
            }}

        </Suspense>
        <Router>
            <main>
                <NavBar/>
                <Routes>
                    <Route path="" view=HomePage/>
                    <Route path="/about-me" view=AboutMe/>
                    <Route path="/lessons" view=Lessons/>
                    <Route path="/*any" view=NotFound/>
                    <Route path="/text" view=crate::text_edit::TextEditor/>
                </Routes>
            </main>
        </Router>
    }
}

#[component]
fn HomePage() -> impl IntoView {
    view! {
        <div class="row text-center">
            <h1>"Berint Moffett"</h1>
            <h3>"Performer, Composer, Programmer"</h3>
        </div>
    }
}

/// 404 - Not Found
#[component]
fn NotFound() -> impl IntoView {
    #[cfg(feature = "ssr")]
    {
        let resp = expect_context::<leptos_actix::ResponseOptions>();
        resp.set_status(actix_web::http::StatusCode::NOT_FOUND);
    }

    view! {
        <Title text="Berint Moffett - 404"/>
        <h3>"Not Found or Not Implemented"</h3>
    }
}
