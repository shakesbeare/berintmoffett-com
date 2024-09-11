import React from 'react';
import Page from './page';
import { ItemGrid, ItemEntry, GameEntry } from '../components/game_entry';


const Programming = () => {
    return (
        <Page>
            <ItemGrid>
                <GameEntry name="rust-snake" alt="Rust Snake Game" tooltipText="Accelerating snake made in Rust with Bevy. Save your scores and compete with your friend!"/>
                <ItemEntry name="shake" alt="Shake" tooltipText="A project manager designed to ease the use of git worktrees in your normal git workflow." handleClick={() => { window.open('https://github.com/shakesbeare/shake') }} inner={null} />
                <GameEntry name="MicroDiablo" alt="MicroDiablo" tooltipText="A WIP roguelike game focused on micro skills. Use the arrow keys to move the camera and try out selecting units, moving them around with right click, and queuing actions by holding shift. This may take a while to load!" url="/static/wasm/MicroDiablo/MicroDiablo.html"/>
            </ItemGrid>
        </Page>
    )
}

export default Programming;
