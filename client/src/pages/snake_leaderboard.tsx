import React from 'react';
import Page from './page';
import Markdown from '../components/markdown';

type LeaderboardEntry = {
    name: string,
    score: number,
}

type Leaderboard = {
    highscores: LeaderboardEntry[],
}

const SnakeLeaderboard = () => {
    const [markdown, setMarkdown] = React.useState("");
    let markdownStr = "# Snake Leaderboard\n\n";
    let got = false;

    React.useEffect(() => {
        if (got) { // why is this necessary?
            return 
        }
        fetch('/api/snake-leaderboard').then((res) => {
            if (res.ok) {
                res.json().then((data: Leaderboard) => {
                    console.log(data.highscores);
                    for (let i = 0; i < data.highscores.length; ++i) {
                        const entry = data.highscores[i];
                        if (entry && entry.score <= 0) {
                        } else if (entry) {
                            markdownStr += `${i}. ${entry.score} - ${entry.name}\n`;
                        }
                    }
                    setMarkdown(markdownStr);
                })
            }
        })
        got = true;
    }, [])
    
    return <Page>
        <Markdown>{markdown}</Markdown>
    </Page>;
}

export default SnakeLeaderboard;
