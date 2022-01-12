import React from 'react';
import "../../css/ttrpg.css";

const Arcane: React.FC = () => {
    return (
        <div className="SubPageBody">
            <div className='ArcanePage'>
                <div className="title">
                    <h1>ARCANE</h1>
                    <h3>Based on the Netflix TV Show</h3>
                    <h4>Using Pathfinder 2e</h4>
                </div>
                <div className='text'>
                    <p>Piltover. The City of Progress. The shining lights of progress tower over the surrounding landscape and the monolithic hexgates whir to life as an enormous air ship flitters into existence above the urban jungle. It was founded to escape the tyranny of the chaotic mages waging grand and oppressively destructive wars against each other. The research and practice of magic is strictly banned within the confines of Piltover and those caught engaging with it are subject to imprisonment at the council's discretion. With its academy the birthplace of hextech, technology fantastically built to harness the great power of magic in a way palatable to the public eye, no one can doubt the lengths which Piltover has gone to better the lives of all people, except perhaps those that dwell in its sister city, the smog-filled industrial wasteland which lives in the shadows of the great city, feeding off its scraps.</p> 
                    <p>Zaun, they call themselves. Most people in Piltover-proper know the area as the undercity. A slimy, disgusting, disease-ridden, toxic chasm sunk into the ground by excessive mining and industrialization. It lay beneath the utopia most people know, festering with crime and resentment as the topsiders choke them out of all resources, respect, and humanity. People are born and die in the gray without ever tasting a breath of the fresh air which exists just on the other side of the cliff. The enforcers from the upper city don't even dare to venture into Zaun unprotected from the toxic fumes which assail every family living underneath them.</p>
                    <p>Zaun is technically independent; the crime lords of old reign soveriegn in the city state as proper governors. But the conflict between the two regions never subsided. Even independent, the people of Zaun must fight for every breath and scrounge for every scrap to get by. </p>
                    <p>Yes, this is Piltover, the <i>City of Progress</i>. Where the nobleman sneer and spit at their fellow man for the location of their birth. Certainly, none deny the great leaps with which Piltover has propelled people around the world, but no one is without sin. </p>
                    <hr />
                    <h3 className='title'>Player Information</h3>
                    <p><strong>Current Players: </strong></p>
                    <ul>
                        <li>Brock{" - ".repeat(15)}Alchemist</li>
                        <li>Kenzie{" - ".repeat(14)}Gunslinger</li>
                        <li>Brandon{" - ".repeat(13)}Undecided</li>
                        <li>Nathan{" - ".repeat(14)}Investigator (Medic)</li>
                        <li>Ryan{" - ".repeat(16)}Inventor</li>
                        <li>Zach{" - ".repeat(16)}Undecided</li>
                    </ul>
                    <hr />
                    <h3 className="title">Character Creation Notes</h3>
                    <p><strong>System:</strong> Pathfinder 2e</p>
                    <p><strong>Allowed Classes: </strong></p>
                    <ul>
                        <li>Alchemist</li>
                        <li>Barbarian (Rare)</li>
                        <li>Fighter</li>
                        <li>Gunslinger</li>
                        <li>Inventor</li>
                        <li>Investigator</li>
                        <li>Monk</li>
                        <li>Ranger (Uncommon)</li>
                        <li>Rogue</li>
                        <li>Swashbuckler (Uncommon)</li>
                    </ul>
                    <p><strong>Allowed Ancestries: </strong>Talk to me, most are okay!</p>
                    <p><strong>Allowed Heritages: </strong>No versatile heritages (tiefling etc).</p>
                    <p><strong>Allowed Dedications: </strong>Talk to me, most are probably okay!</p>
                    <p><strong>Starting Level: </strong>3</p>
                    <h3>Note: </h3>
                    <p>Certain subclasses or feats may be disallowed.</p>
                    <hr />             
                    <h1 className='title'>Coming Soon...</h1>
                    <h2 className='title'>Beginning spring term 2022!</h2>
                    <hr />
                </div>
            </div>
        </div>
    );
}

export default Arcane;