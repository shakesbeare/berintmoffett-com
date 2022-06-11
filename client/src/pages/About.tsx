import React, { useState, useEffect } from 'react'
import "../css/layout.css"
import ReactMarkdown from 'react-markdown';

const About: React.FC = () => {

    const [data, setState] = useState<string | null>(null);
    useEffect(() => {
        fetch('/posts/list')
            .then((res) => res.json())
            .then((data) => setState(data.content));
    })
    //@ts-expect-error
    const post_list = JSON.parse(data);
    console.log(post_list);

    return (
        <div className="PageBody">
            <ReactMarkdown>{ !data ? "Loading..." : post_list[0] + post_list[1] }</ReactMarkdown>
        </div>
    )
}

export default About;