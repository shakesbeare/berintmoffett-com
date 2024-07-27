import React from 'react';
import Page from './page';
import Markdown from '../components/markdown';
import TwoColumn from '../components/two_column';

const About = () => {
    let [about, setAbout] = React.useState("Loading...");

    React.useEffect(() => {
        fetch("/static/about.md")
            .then(response => response.text())
            .then(text => setAbout(text));
    }, []);

    return (
        <div>
            <div className="text-3xl text-center">About this Website</div>
            <div>
                <Markdown>{about}</Markdown>
            </div>
        </div>
    )
}

export default About;
