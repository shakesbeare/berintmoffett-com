import {Outlet, Link} from "react-router-dom";

import '../css/layout.css';

function Layout() {
  return (
      <>
        <nav>
            <div className="NavBar">
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/compositions">COMPOSITIONS</Link></li>
                <li><Link to="/tabletop-rpg">TABLETOP RPG</Link></li>
                <li><Link to="/about-me">ABOUT ME</Link></li>
            </ul>
            </div>
        </nav>

        <Outlet />
      </>
  );
}

export default Layout;
