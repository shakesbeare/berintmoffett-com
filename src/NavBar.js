import './css/NavBar.css';

function NavBar() {
  return (
    <>
    <nav>
      <div className="NavBar">
        <ul>
          <li><a href="/">HOME</a></li>
          <li><a href="compositions">COMPOSITIONS</a></li>
          <li><a href="arcane-p2e">TABLETOP GAMING</a></li>
          <li><a href="about-me">ABOUT ME</a></li>
        </ul>
      </div>
    </nav>

    <Outlet />    
    </>
  );
}

export default NavBar;
