use leptos::*;
use leptos_meta::*;
use leptos_router::*;

use crate::about_me::AboutMe;
use crate::lessons::Lessons;

#[component]
pub fn App(cx: Scope) -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context(cx);

    view! { cx,
        // injects a stylesheet into the document <head>
        // id=leptos means cargo-leptos will hot-reload this stylesheet
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>

        // sets the document title
        <Title text="Welcome to Leptos"/>

        // content for this welcome page
        <Router>
            <main>
                <nav class="bg-dark navbar navbar-expand-lg text-light">
                  <div class="container-fluid">
                    <a class="navbar-brand text-reset" href="/">Home</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        // navbar items
                        <li class="nav-item">
                          <a class="nav-link active text-reset" aria-current="page" href="/about-me">About Me</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link text-reset" href="/lessons">Lessons</a>
                        </li>

                        <li class="nav-item">
                          <a class="nav-link text-reset" href="/programming">Programming</a>
                        </li>

                        <li class="nav-item">
                          <a class="nav-link text-reset" href="/composition">Composition</a>
                        </li>

                        <li class="nav-item">
                          <a class="nav-link text-reset" href="/account">Account</a>
                        </li>

                      </ul>
                    </div>
                  </div>
                </nav>
                <Routes>
                    <Route path="" view=HomePage/>
                    <Route path="/about-me" view=AboutMe/>
                    <Route path="/lessons" view=Lessons/>
                    <Route path="/*any" view=NotFound/>
                </Routes>
            </main>
        </Router>
    }
}

/// Renders the home page of your application.
#[component]
fn HomePage(cx: Scope) -> impl IntoView {

    view! { cx,
        <div class="row text-center">
            <h1>"Berint Moffett"</h1>
            <h3>"Performer, Composer, Programmer"</h3>
        </div>
    }
}

/// 404 - Not Found
#[component]
fn NotFound(cx: Scope) -> impl IntoView {
    // set an HTTP status code 404
    // this is feature gated because it can only be done during
    // initial server-side rendering
    // if you navigate to the 404 page subsequently, the status
    // code will not be set because there is not a new HTTP request
    // to the server
    #[cfg(feature = "ssr")]
    {
        // this can be done inline because it's synchronous
        // if it were async, we'd use a server function
        let resp = expect_context::<leptos_actix::ResponseOptions>(cx);
        resp.set_status(actix_web::http::StatusCode::NOT_FOUND);
    }

    view! { cx,
        <h3>"Not Found or Not Implemented"</h3>
    }
}
