import React from 'react';

const Page = (param: {children?: React.ReactNode, className?: string}) => {
    return (
        <div className="text-xs sm:text-sm md:text-base h-min">
            { param.children }
        </div>
    )
}

export default Page;
