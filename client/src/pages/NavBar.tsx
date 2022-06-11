import React from 'react';
import { Outlet, NavLink } from "react-router-dom";

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
          <div className="NavBar-right">
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}




export default NavBar;
