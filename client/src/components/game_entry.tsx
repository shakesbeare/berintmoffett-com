import React from 'react';
import { kebabCaseToTitleCase } from '../tools/text';

const GameEntry = (opts: {name: string}) => {
    const [gameLoaded, setGameLoaded] = React.useState(false);

    const handleClick = () => {
        const dialog = document.getElementById(`${opts.name}-dialog`) as HTMLDialogElement;
        dialog.showModal();
        setGameLoaded(true);
    }

    React.useEffect(() => {
        const dialog = document.getElementById(`${opts.name}-dialog`) as HTMLDialogElement;
        dialog.addEventListener('click', (event) => {
            let rect = dialog.getBoundingClientRect();
            var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                dialog.close();
                setGameLoaded(false);
            }
        });

        dialog.addEventListener('keydown', (ev) => {
            if (ev.key === "Escape") {
                dialog.close();
                setGameLoaded(false);
            }
        })
    });

    const dialogStyle = {
        width: "700px",
        height: "700px",
    }

    const title = kebabCaseToTitleCase(opts.name);

    return (
        <div>
            <div className="cursor-pointer grid grid-rows-2 w-20 justify-items-center">
                <img onClick={handleClick} src={`/static/img/${opts.name}-thumbnail.png`} width={75} height={75} alt="Rust Snake Game" className="row-span-1" />
                <div className="row-span-1 text-sm">{title}</div>
            </div>
            <dialog id={`${opts.name}-dialog`} style={dialogStyle}>
                <div className="align-middle h-full w-full">
                    { gameLoaded && <WasmFrame name={opts.name} /> }
                </div>
            </dialog>
        </div>
    )
}

const WasmFrame = (opts: {name: string}) => {
    return (
            <iframe
                id={`${opts.name}-iframe`}
                width="100%"
                height="100%"
                src={`/static/${opts.name}.html`}
                className="p-10"
            >
            </iframe>
    );
}

export default GameEntry;
