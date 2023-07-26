use leptos::*;
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
pub fn Lessons(cx: Scope) -> impl IntoView {
    let policy_resource = create_resource(cx, || (), |_| async move { get_lesson_policy().await });
    let about_resource = create_resource(cx, || (), |_| async move { get_lesson_details().await });
    view! { cx,
        <div class="container">
            <div class="row mb-3 p-2">
                <h1 class="text-center">"Private Music Lessons"</h1>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <Suspense fallback=move || view!{ cx, <p>"Loading..."</p> }.into_view(cx)>
                        {move || match about_resource.read(cx) {
                                Some(res) => {
                                    let Ok(html) = res else {
                                        return view!{ cx, <p>"An Error Occurred"</p>}.into_view(cx);
                                    };
                                    view!{ cx, <div inner_html=html /> }.into_view(cx)
                                }
                                None => view!{ cx, <p>"File Not Found"</p> }.into_view(cx)
                            }
                        }
                    </Suspense>
                </div>
                <div class="col-md-6">
                    <Suspense fallback=move || view!{ cx, <p>"Loading..."</p> }.into_view(cx)>
                        {move || match policy_resource.read(cx) {
                                Some(res) => {
                                    let Ok(html) = res else {
                                        return view!{ cx, <p>"An Error Occurred"</p>}.into_view(cx);
                                    };
                                    view!{ cx, <div inner_html=html /> }.into_view(cx)
                                }
                                None => view!{ cx, <p>"File Not Found"</p> }.into_view(cx)
                            }
                        }
                    </Suspense>
                </div>
            </div>
        </div>
    }
}
