import React from 'react';
import { kebabCaseToTitleCase } from '../tools/text';
import { Tooltip } from 'react-tooltip';

const DIALOG_STYLE = {
    width: '618px', // something is adding 8px of padding... weird
    height: '618px',
    overflow: 'hidden',
}

const I_FRAME_STYLE: React.CSSProperties = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    border: '0px',
    overflow: 'hidden',
}

export const ItemGrid = (opts: { children?: React.ReactNode }) => {
    return (
        <div className="cursor-pointer grid grid-cols-4 md:grid-cols-7 lg:grid-cols-9 grid-rows-auto w-100% justify-items-center">
            {opts.children}
        </div>
    )
}

export const ItemEntry = (opts: { name: string, alt: string, handleClick: () => void, inner?: React.ReactNode, tooltipText?: string }) => {
    const title = kebabCaseToTitleCase(opts.name);
    const tooltipName = `${opts.name}-tooltip`;

    return (
        <div>
            <button onClick={opts.handleClick} data-tooltip-id={tooltipName} className="dark:bg-cavernous-700 bg-cavernous-50 hover:bg-blue hover:text-cavernous-700 m-1 px-2 py-1 rounded-md shadow-md shadow-cavernous-300 dark:shadow-cavernous-800">
                <img src={`/static/img/${opts.name}-thumbnail.png`} width={75} height={75} alt={opts.alt} className="rounded-md row-span-1" />
                <div className="row-span-1 text-sm">{title}</div>
                {opts.inner}
            </button>
            <Tooltip id={tooltipName} content={opts.tooltipText} disableStyleInjection={true} className="bg-cavernous-25 dark:bg-cavernous-750 p-2 w-40 border-solid border-2 border-cavernous-100 dark:border-cavernous-700 rounded-md shadow-cavernous-300 dark:shadow-cavernous-800 shadow-md"></Tooltip>
        </div>
    )
}

export const ItemEntryDialog = (opts: { name: string, alt: string, inner: React.ReactNode, style: React.CSSProperties, tooltipText?: string }) => {
    const [itemLoaded, setItemLoaded] = React.useState(false);

    const handleClick = () => {
        const dialog = document.getElementById(`${opts.name}-dialog`);
        if (dialog) {
            (dialog as HTMLDialogElement).showModal();
            setItemLoaded(true);
        }
    }

    React.useEffect(() => {
        const maybeDialog = document.getElementById(`${opts.name}-dialog`);
        if (!maybeDialog) {
            return;
        }
        const dialog = maybeDialog as HTMLDialogElement;
        dialog.addEventListener('click', (event) => {
            let rect = dialog.getBoundingClientRect();
            var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                dialog.close();
                setItemLoaded(false);
            }
        });

        dialog.addEventListener('keydown', (ev) => {
            if (ev.key === "Escape") {
                dialog.close();
                setItemLoaded(false);
            }
        })
    });

    return (<ItemEntry
        name={opts.name} alt={opts.alt} tooltipText={opts.tooltipText} handleClick={handleClick} inner=
        <dialog id={`${opts.name}-dialog`} style={DIALOG_STYLE} className="bg-cavernous-50 dark:bg-cavernous-750 rounded-lg">
            {itemLoaded && opts.inner}
        </dialog>
    />)
}

export const GameEntry = (opts: { name: string, alt: string, tooltipText?: string }) => {
    return ItemEntryDialog({ name: opts.name, alt: opts.alt, inner: <WasmFrame name={opts.name} />, style: DIALOG_STYLE, tooltipText: opts.tooltipText });
}

const WasmFrame = (opts: { name: string }) => {
    return (
        <iframe
            id={`${opts.name}-iframe`}
            style={I_FRAME_STYLE}
            src={`/static/${opts.name}.html`}
            className="bg-cavernous-25 dark:bg-cavernous-750"
        >
        </iframe>
    );
}
