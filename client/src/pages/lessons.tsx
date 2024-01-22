import React from 'react';
import Page from './page';
import TwoColumn from '../components/two_column';
import Markdown from '../components/markdown';
import Table from '../components/table';

const Lessons = () => {
    const [details, setDetails] = React.useState("Loading...");
    const [policy, setPolicy] = React.useState("Loading...");

    React.useEffect(() => {
        fetch("/static/lessons/lesson-details.md")
            .then(response => response.text())
            .then(text => setDetails(text));
    }, []);

    React.useEffect(() => {
        fetch("/static/lessons/lesson-policy.md")
            .then(response => response.text())
            .then(text => setPolicy(text));
    }, []);

    return (
        <Page>
            <div className="text-3xl text-center">Private Music Lessons</div>
            <TwoColumn>
                <div>
                    <Markdown>{details}</Markdown>
                </div>
                <div>
                    <Markdown>{policy}</Markdown>
                </div>
            </TwoColumn>
        </Page>
    )
}

export default Lessons;
