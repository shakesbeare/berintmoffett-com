import React from 'react';
import { Link } from 'react-router-dom';
import { useOutsideClick } from '../hooks/outside_click';

export const DropdownItem = (param: { text: string, uri: string, className?: string }) => {
    let className = (param.className ? param.className : "") + " p-2 bg-cavernous-25 dark:bg-cavernous-750 hover:bg-light_blue hover:text-cavernous-700";
    return (
        <Link to={param.uri} className={className}>{param.text}</Link>
    )
}

export const Dropdown = (param: { children?: React.ReactNode, className?: string }) => {
    let className = (param.className ? param.className : "") + " bg-cavernous-25 p-1 z-40 w-16 text-2xl grid grid-flow-col text-center";
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleOutsideClick = () => {
        setIsOpen(false);
    }

    const ref = useOutsideClick(handleOutsideClick);

    return (
        <div className={className}>
            <button ref={ref} onClick={toggleDropdown} className="bg-cavernous-25 ring-1 ring-cavernous-100 dark:ring-0 flex flex-col justify-center items-center shadow-md dark:shadow-cavernous-950 rounded-md dark:bg-cavernous-600 p-2  hover:bg-light_blue hover:text-cavernous-700">
                <span className={`overflow-auto block my-0.5 h-0.5 w-6 bg-cavernous-950`}></span>
                <span className={`overflow-auto block my-0.5 h-0.5 w-6 bg-cavernous-950`}></span>
                <span className={`overflow-auto block my-0.5 h-0.5 w-6 bg-cavernous-950`}></span>
            </button>
            {isOpen ? (
                <div className="z-40 my-10 grid grid-flow-row absolute dark:shadow-cavernous-950 rounded-md shadow-md dark:bg-cavernous-750">
                    {param.children}
                </div>
            ) : null}
        </div>
    )
}


