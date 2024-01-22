import React from 'react';

const Page = (param: {children?: React.ReactNode}) => {
    return (
        <div className="text-xs sm:text-sm md:text-base">
            { param.children }
        </div>
    )
}

export default Page;
