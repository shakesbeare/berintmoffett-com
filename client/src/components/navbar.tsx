import React from "react";
import { Link } from "react-router-dom";

export const NavbarItem = (param: { text: string, uri: string, className?: string }) => {
    let className = (param.className ? param.className : "") + " col-span-1 py-3 hover:bg-[#8cd0f2] hover:text-cavernous-700";
    return (
        <Link to={param.uri} className={className}>{param.text}</Link>
    )
}

export const Navbar = (param: {children?: React.ReactNode, className?: string }) => {
    let className = (param.className ? param.className : "") + " text-sm sm:text-xl md:text-2xl px-1 grid grid-flow-col text-center";
    return ( 
        <div className={className}>
            { param.children }
        </div>
    )

}

