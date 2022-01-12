import React, { useState, useEffect } from 'react'
import "../css/layout.css"

const About: React.FC = () => {
    const [data, setState] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api')
        .then((res) => res.json())
        .then((data) => setState(data.message));
    }, []);

    return (
        <div className="PageBody">
            <p>{!data ? "Loading..." : data}</p>
        </div>
    )
};

export default About;