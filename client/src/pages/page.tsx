import React from 'react';

const Page = (param: {children?: React.ReactNode, className?: string}) => {
    return (
        <div className="text-base">
            { param.children }
        </div>
    )
}

export default Page;
