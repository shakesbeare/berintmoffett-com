import React from 'react';

const TwoColumn = (param: { children?: React.ReactNode, className?: string }) => {

    let className = (param.className ? param.className : "") + " grid grid-flow-row gap-3 lg:grid-cols-2 lg:gap-4";
    return (
        <div className={className}>
            {param.children}
        </div>
    )
}

export default TwoColumn;
