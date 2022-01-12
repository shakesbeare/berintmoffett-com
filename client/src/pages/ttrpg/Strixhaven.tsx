import React from 'react';
import "../../css/ttrpg.css";

const Strixhaven: React.FC = () => {
    return (
        <div className="SubPageBody">
            <div className='title'>
                <h1>STRIXHAVEN: CURRICULUM OF CHAOS</h1>
                <h3>Created by Wizards of the Coast</h3>
                <h4>Using Dungeons & Dragons 5e</h4>
            </div>
            <div className='text'>
                <p><strong>Meeting Times: </strong>Tuesdays @ 9:00am</p>
                <p>Strixhaven University is comprised of 5 colleges which represent the pinnacle of magical education. </p>
                <ul>
                    <li>Lorehold: History</li>
                    <li>Prismari: Art</li>
                    <li>Quandrix: Mathemtics</li>
                    <li>Silverquil: Oration</li>
                    <li>Witherbloom: Biology</li>
                </ul>
                <p>Students will learn the deepest secrets of the arcane while pursuing the greatest romances and dangers which the fantastic world of college can provide!</p>
            </div>
        </div>
    )
}

export default Strixhaven;