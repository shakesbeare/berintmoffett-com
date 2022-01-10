import {Outlet, Link} from "react-router-dom";

import '../css/Layout.css';

function Layout() {
  return (
      <>
        <nav>
            <div className="NavBar">
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/compositions">COMPOSITIONS</Link></li>
                <li><Link to="/tabletop-gaming">TABLETOP GAMING</Link></li>
                <li><Link to="/about-me">ABOUT ME</Link></li>
            </ul>
            </div>
        </nav>

        <Outlet />
      </>
  );
}

export default Layout;
