import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/layout.css"

const Home: React.FC = () => {
    useEffect(() => {
        axios.get('/api/hello')
        .then(res => setState(res.data))
    }, [])

    const [data, setState] = useState('');
    return (
        <div className="PageBody">
            <h1>Welcome to my website!</h1>
            <p>It's brand new, try the navbar!</p>
            <p>{data}</p>
        </div>
    )
};

export default Home;