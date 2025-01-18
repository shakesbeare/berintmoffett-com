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
                <div className="relative inset-0 flex z-10">
                    <img src="static/img/bear-portrait.jpg" alt="Bear Moffett" className="rounded-md m-auto" />
                </div>
                <div className="relative inset-0 flex">
                    <div className="m-auto">
                        <Markdown>{about}</Markdown>
                    </div>
                </div>
            </TwoColumn>
        </Page>
    )
}

export default Home;
