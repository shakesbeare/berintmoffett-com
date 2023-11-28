use leptos::*;
use leptos_meta::Title;

use markdown::to_html;
use std::fs::read_to_string;

#[server(GetLessonPolicy, "/api")]
pub async fn get_about_me() -> Result<String, ServerFnError> {
    match read_to_string("assets/about_me.md") {
        Ok(v) => return Ok(to_html(&v)),
        Err(e) => {
            return Err(ServerFnError::from(e));
        }
    }
}

/// The About Me page
#[component]
pub fn AboutMe() -> impl IntoView {
    let about_me =
        create_resource(|| (), |_| async move { get_about_me().await });

    view! {
        <Title text="Berint Moffett - About Me"/>

        <div class="container">
            <div class="row mb-3 p-2">
                <h1 class="text-center">"About Berint"</h1>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <img
                        src="https://www.dl.dropboxusercontent.com/s/gt4delvds8ngm45/Bear%20Moffett.jpg?dl=0"
                        class="shadow img-fluid"
                        alt="Berint Moffett"
                    />
                </div>
                <div class="col-md-6">
                    <div class="fs-6">
                        <Suspense fallback=move || {
                            view! { <p>"Loading..."</p> }.into_view()
                        }>
                            {move || match about_me.get() {
                                Some(res) => {
                                    let Ok(html) = res else {
                                    return view! { <p>"An Error Occurred"</p> }
                                        .into_view();
                                };
                                    view! { <div inner_html=html></div> }.into_view()
                                }
                                None => {

                                    view! { <p>"File Not Found"</p> }
                                        .into_view()
                                }
                            }}

                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    }
}
