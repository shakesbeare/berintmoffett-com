import React from 'react';
import { Link } from 'react-router-dom';
import { useOutsideClick } from '../hooks/outside_click';

export const DropdownItem = (param: { text: string, uri: string, className?: string }) => {
    let className = (param.className ? param.className : "") + " p-2 hover:bg-light_blue hover:text-cavernous-700";
    return (
        <Link to={param.uri} className={className}>{param.text}</Link>
    )
}

export const Dropdown = (param: { children?: React.ReactNode, className?: string }) => {
    let className = (param.className ? param.className : "") + " w-16 text-2xl px-1 grid grid-flow-col text-center";
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
            <button ref={ref} onClick={toggleDropdown} className="flex flex-col justify-center items-center shadow-md dark:shadow-cavernous-950 rounded-md bg-cavernous-600 p-2  hover:bg-light_blue hover:text-cavernous-700">
                <span className={`block my-0.5 h-0.5 w-6 bg-cavernous-950`}></span>
                <span className={`block my-0.5 h-0.5 w-6 bg-cavernous-950`}></span>
                <span className={`block my-0.5 h-0.5 w-6 bg-cavernous-950`}></span>
            </button>
            {isOpen ? (
                <div className="my-10 grid grid-flow-row fixed dark:shadow-cavernous-950 rounded-md shadow-md bg-cavernous-750">
                    {param.children}
                </div>
            ) : null}
        </div>
    )
}


