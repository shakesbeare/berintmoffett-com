use leptos::*;

#[component]
pub fn TextEditor() -> impl IntoView {
    view! {
        <div
            class="container border rounded shadow bg-secondary"
            style="max-width: 50%;"
        >
            <div class="row mb-3 p-2">
                <div class="">
                    <div class="row mb-3 p-2">
                        <h4 class="text-center">"Text box title"</h4>
                    </div>
                    <div class="row justify-content-center mb-3 p-2">
                        <textarea
                            placeholder="Enter text here"
                            style="max-width: 75%; min-height: 10rem;"
                            class="form-control"
                            rows="10"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    }
}
