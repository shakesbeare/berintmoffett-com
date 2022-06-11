import React, { useState, useEffect } from 'react'
import "../css/layout.css"
import ReactMarkdown from 'react-markdown';

const About: React.FC = () => {

    const [data, setState] = useState<string | null>(null);
    useEffect(() => {
        fetch('/api/posts/about_me')
            .then((res) => {
                return res.json();
            })
            .then((data) => setState(data.content));
    })


    return (
        <div className="PageBody">
            <ReactMarkdown>{ !data ? "Loading..." : data }</ReactMarkdown>
        </div>
    )
}

export default About;