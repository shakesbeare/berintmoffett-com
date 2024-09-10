import React from 'react';
import Page from './page';
import Markdown from '../components/markdown';
import TwoColumn from '../components/two_column';

const Home = () => {
    let [about, setAbout] = React.useState("Loading...");

    React.useEffect(() => {
        fetch("/static/bio.md")
            .then(response => response.text())
            .then(text => setAbout(text));
    }, []);

    return (
        <Page>
            <TwoColumn>
                <div>
                    <img src="static/img/bear-portrait.jpg" alt="Bear Moffett" className="rounded-md align-middle" />
                </div>
                <div>
                    <Markdown>{about}</Markdown>
                </div>
            </TwoColumn>
        </Page>
    )
}

export default Home;
