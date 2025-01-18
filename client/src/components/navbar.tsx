import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownItem } from "./dropdown";
import { useWindowDimensions } from "../hooks/window";

export const NavbarItem = (param: { text: string, uri: string, className?: string }) => {
    let className = (param.className ? param.className : "") + " col-span-1 py-3 hover:bg-light_blue hover:text-cavernous-700";
    return (
        <Link to={param.uri} className={className}>{param.text}</Link>
    )
}

export const Navbar = (param: { children?: React.ReactNode, className?: string }) => {
    let className = (param.className ? param.className : "") + " text-2xl px-1 grid grid-flow-col text-center";
    return (
        <div className={className}>
            {param.children}
        </div>
    )

}

export const GlobalNavBar = (param: { minWidth: number }) => {
    const [shouldDropdown, setShouldDropdown] = React.useState(param.minWidth ? window.innerWidth < param.minWidth : false);
    const windowDimensions = useWindowDimensions();

    React.useEffect(() => {
        if (windowDimensions.width < param.minWidth) {
            setShouldDropdown(true);
        } else {
            setShouldDropdown(false);
        }
    }, [windowDimensions]);

    const navbarVariant = (
        <Navbar>
            <NavbarItem text="Home" uri="/" />
            <NavbarItem text="About" uri="/about" />
            <NavbarItem text="Lessons" uri="/lessons" />
            {/*<NavbarItem text="Composition" uri="/composition" />*/}
            <NavbarItem text="Programming" uri="/programming" />
            <NavbarItem text="Contact" uri="/contact" />
            {/* <NavbarItem text="Login" uri="/login" className="col-start-12" />*/}
        </Navbar>
    );
    const dropdownVariant = (
        <Dropdown className="my-2">
            <DropdownItem text="Home" uri="/" />
            <DropdownItem text="About" uri="/about" />
            <DropdownItem text="Lessons" uri="/lessons" />
            <DropdownItem text="Programming" uri="/programming" />
            <DropdownItem text="Contact" uri="/contact" />
        </Dropdown>
    );

    return (shouldDropdown ? dropdownVariant : navbarVariant);
}

