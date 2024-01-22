import React from 'react';
import Page from './page';
import Markdown from '../components/markdown';
import TwoColumn from '../components/two_column';

const About = () => {
    let [about, setAbout] = React.useState("Loading...");

    React.useEffect(() => {
        fetch("/static/about-me.md")
            .then(response => response.text())
            .then(text => setAbout(text));
    }, []);

    return (
        <Page>
            <TwoColumn>
                <div>
                    <img src="https://www.dl.dropboxusercontent.com/s/gt4delvds8ngm45/Bear%20Moffett.jpg?dl=0" alt="Bear Moffett" />
                </div>
                <div>
                    <Markdown>{about}</Markdown>
                </div>
            </TwoColumn>
        </Page>
    )
}

export default About;
