import React from 'react';
import Page from './page';
import { ItemGrid, ItemEntry, GameEntry } from '../components/game_entry';

const MICRO_DIABLO_STYLE = {
    width: '1298px', // something is adding 8px of padding... weird
    height: '738px',
    overflow: 'hidden',
}


const Programming = () => {
    return (
        <Page>
            <ItemGrid>
                <GameEntry name="rust-snake" alt="Rust Snake Game" tooltipText="Accelerating snake made in Rust with Bevy. Save your scores and compete with your friend!" />
                <GameEntry name="shake-chess" alt="Chess!" tooltipText="A simple chess platform. Play against your local friends, AI, or watch two AI face off against each other!" dialogStyle={{ width: '1298px', height: '738px', overflow: 'hidden' }} />
                <ItemEntry name="shake" alt="Shake" tooltipText="A project manager designed to ease the use of git worktrees in your normal git workflow." handleClick={() => { window.open('https://github.com/shakesbeare/shake') }} inner={null} />
                <GameEntry name="MicroDiablo" alt="MicroDiablo" tooltipText="A WIP roguelike game focused on micro skills. Use the arrow keys to move the camera and try out selecting units, moving them around with right click, and queuing actions by holding shift. This may take a while to load!" url="/static/wasm/MicroDiablo/MicroDiablo.html" dialogStyle={MICRO_DIABLO_STYLE}
                    alert={`ARROW KEYS to move the camera
LEFT-CLICK and drag to select cubes
RIGHT-CLICK to issue move commands
HOLD-SHIFT to queue actions

When the Godot logo disappears, the game is loaded!`} />
            </ItemGrid>
        </Page>
    )
}

export default Programming;
