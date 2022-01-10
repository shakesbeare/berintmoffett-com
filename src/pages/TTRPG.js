import { Outlet, Link } from 'react-router-dom';

import "../css/layout.css";
import "../css/ttrpg.css"

const RPGNavBar = () => {
    return (
        <>
            <nav>
                <div className="SubNavBar">
                    <ul>
                        <li><Link to="/tabletop-rpg/arcane">ARCANE</Link></li>
                        <li><Link to="/tabletop-rpg/strixhaven">STRIXHAVEN</Link></li>
                    </ul>
                </div>
            </nav>

            <Outlet />
        </>
    );
}

const TTRPG = () => {
    return (
        <>
            <RPGNavBar />
        </>
    )
};

export default TTRPG;