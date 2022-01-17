import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import '../css/layout.css';

const Profile: React.FC = () => {
    const { user, isAuthenticated } = useAuth0();
    if (isAuthenticated && user) {
        return (
            <div className="PageBody">
                <h1>Hello, {user.name}</h1>
            <p>Your email is {user.email}</p>
        </div>
        )
    } else {
        return <p>Not Logged In</p>
    }
}

export default Profile;