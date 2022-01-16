import React from 'react';
import '../css/layout.css';
import '../css/login.css';

import LoginForm from "../components/LoginForm";


function Login(): React.ReactElement {
    return (
        <div className="PageBody">
            <div className="container">
                <div className="Login">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login;