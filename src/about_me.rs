use leptos::*;

/// The About Me page
#[component]
pub fn AboutMe(cx: Scope) -> impl IntoView {
    view! { cx,
        <div class="container">
            <div class="row mb-3 p-2">
                <h1 class="text-center">About Berint</h1>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <img src="https://www.dl.dropboxusercontent.com/s/gt4delvds8ngm45/Bear%20Moffett.jpg?dl=0" class="img-fluid" alt="Berint Moffett"/>
                </div>
                <div class="col-md-6">
                    <p class="fs-5">
        "Berint Moffett (Bear) is a senior Music Performance and Computer Science
        student and the College of Idaho. An avid teacher, he has more than
        7 years of teaching experience. Bear has consistently received
        recommendations from professors at the College for on-campus
        teaching work in computer science and music theory and also
        receives many referrals to teach extra-curricular music lessons
        on both cello and trombone to younger students in the valley."
        <br />
        <br />
        "As a performer, Bear has performed with the College of Idaho Sinfonia and 
        Wind Ensemble each year at the College of Idaho. Additionally, he has also
        had the opportunity to perform with the Brass Band of the Treasure Valley.
        Bear has performed notable works from the Bass Trombone solo repertoire
        including the John Williams Tuba Concerto and Casterede's Fantasie Contertante."
        <br />
        <br />
        "As a composer, Bear has had multiple works performed and has received commissions
        to write cadenzas for his peers. "
        <br />
        <br />
        "In his free time, Bear enjoys spending quality time with his friends and family. 
        He is currently learning German in order to attend graduate school in Germany in 
        2025."
        </p>
                </div>
            </div>
        </div>
    }
}
