import './index.css';
import React from 'react';
import { Navbar, NavbarItem } from './components/navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Home from './pages/home';

const Section = (param: { children?: React.ReactNode, className?: string }) => {

    let className = (param.className ? param.className : "") + 
        " row-auto row-start-auto bg-neutral-100 dark:bg-neutral-800 mb-2 sm:mb-4 font-sans text-neutral-900 dark:text-neutral-300 rounded-m shadow-lg dark:shadow-2xl";
    return (
        <div className={className}>
            {param.children}
        </div>
    )
}

const App = () => {
    const { pathname } = useLocation();
    return (
        <React.StrictMode >
            <Section className="min-w-full" >
                <Navbar>
                    <NavbarItem text="Home" uri="/" />
                    <NavbarItem text="About" uri="/about" />
                    <NavbarItem text="Lessons" uri="/lessons" />
                    <NavbarItem text="Composition" uri="/composition" />
                    <NavbarItem text="Programming" uri="/programming" />
                    <NavbarItem text="Contact" uri="/contact" />
                    <NavbarItem text="Login" uri="/login" className="col-start-12" />
                </Navbar>
            </Section>
            <div className="flex justify-center">
                <Section className="sm:w-11/12 md:max-w-5xl px-4 py-2 sm:py-4">
                    {pathname == '/' ? <Home /> : <Outlet /> }
                </Section>
            </div>
        </React.StrictMode>
    )
}

export default App;
