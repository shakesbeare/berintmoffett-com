use crate::{
    auth::User,
    login::{LoginNavBar, UserDisplay},
};
use leptos::*;

#[component]
pub fn NavBar() -> impl IntoView {
    let (get_user, set_user) = create_signal::<User>(User::default());
    provide_context(get_user);
    provide_context(set_user);

    view! {
        <nav class="navbar-dark bg-dark navbar navbar-expand-lg sticky-top">
            <div class="container-fluid shadow-sm">
                <a class="navbar-brand " href="/">
                    Home
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        // navbar items
                        <li class="nav-item">
                            <a class="nav-link " aria-current="page" href="/about-me">
                                "About Me"
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link " href="/lessons">
                                "Lessons"
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link " href="/programming">
                                "Programming"
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link " href="/composition">
                                "Composition"
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link " href="/account">
                                "Account"
                            </a>
                        </li>
                    </ul>

                    {move || {
                        if get_user.get().id() != -1 {
                            view! { <UserDisplay/> }
                        } else {
                            view! { <LoginNavBar/> }
                        }
                    }}

                </div>
            </div>
        </nav>
    }
}
