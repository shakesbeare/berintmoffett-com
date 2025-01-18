import React from 'react';

export const useOutsideClick = (callback: any) => {
    const ref = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        const handleClick = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [ref]);

    return ref;
};
