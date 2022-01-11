import "../css/layout.css"
import react from 'react'

const About = () => {
    const [data, setData] = react.useState(null);

    react.useEffect(() => {
        fetch('/api')
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

    return (
        <div class="PageBody">
            <p>{!data ? "Loading..." : data}</p>
        </div>
    )
};

export default About;