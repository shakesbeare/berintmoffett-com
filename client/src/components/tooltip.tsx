import React from 'react';

export const Tooltip = (opts: { name: string, children?: React.ReactNode }) => {
    return (
        <div id={opts.name} role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            <Tooltip name={tooltipName}>{opts.tooltipText}</Tooltip>
            Tooltip name={tooltipName}>{opts.tooltipText}</Tooltip>
            { opts.children }
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    )


}
