import React from 'react';
import {Outlet, NavLink} from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';

import '../css/layout.css';
import '../css/login.css';

const NavBar: React.FC = () => {
  return (
      <>
        <nav>
            <div className="NavBar">
              <NavLink to="/">HOME</NavLink>
              <NavLink to="/compositions">COMPOSITIONS</NavLink>
              <NavLink to="/tabletop-rpg">TABLETOP RPG</NavLink>
              <NavLink to="/about-me">ABOUT ME</NavLink>
              <NavLink to="/profile">PROFILE</NavLink>
              <div className="NavBar-right">
                <div className="button-sort">
                <LogInOutButton />
                </div>
              </div>
            </div>
        </nav>

        <Outlet />
      </>
  );
}


const LogInOutButton: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout  } = useAuth0();

  if (!isAuthenticated) {
    return <button className="loginSubmit" onClick={() => loginWithRedirect()}>LOGIN</button>
  } else {
    return (
      <div>
        <button className="loginSubmit" onClick={() => logout({ returnTo: window.location.origin })}>LOGOUT</button>
      </div>
    )
  } 

}

export default NavBar;
