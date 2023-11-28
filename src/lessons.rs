use leptos::*;
use leptos_meta::Title;
use markdown::to_html;
use std::fs::read_to_string;

#[server(GetLessonPolicy, "/api")]
pub async fn get_lesson_policy() -> Result<String, ServerFnError> {
    match read_to_string("assets/lessons/Lesson Policy 7-24-23 web.md") {
        Ok(v) => return Ok(to_html(&v)),
        Err(e) => {
            return Err(ServerFnError::from(e));
        }
    }
}

#[server(GetLessonDetails, "/api")]
pub async fn get_lesson_details() -> Result<String, ServerFnError> {
    match read_to_string("assets/lessons/Lesson Details 7-26-23.md") {
        Ok(v) => return Ok(to_html(&v)),
        Err(e) => {
            return Err(ServerFnError::from(e));
        }
    }
}
/// The Lessons Page
#[component]
pub fn Lessons() -> impl IntoView {
    let policy_resource =
        create_resource(|| (), |_| async move { get_lesson_policy().await });
    let about_resource =
        create_resource(|| (), |_| async move { get_lesson_details().await });

    view! {
        <Title text="Berint Moffett - Lessons"/>
        <div class="container">
            <div class="row mb-3 p-2">
                <h1 class="text-center">"Private Music Lessons"</h1>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <Suspense fallback=move || {
                        view! { <p>"Loading..."</p> }.into_view()
                    }>
                        {move || match about_resource.get() {
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
                <div class="col-md-6">
                    <Suspense fallback=move || {
                        view! { <p>"Loading..."</p> }.into_view()
                    }>
                        {move || match policy_resource.get() {
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
    }
}
