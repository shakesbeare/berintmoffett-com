import './index.css';
import React from 'react';
import { GlobalNavBar, Navbar, NavbarItem } from './components/navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Home from './pages/home';

const Section = (param: { children?: React.ReactNode, className?: string }) => {

    let className = (param.className ? param.className : "") +
        " row-auto row-start-auto bg-cavernous-25 dark:bg-cavernous-750 mb-2 sm:mb-4 font-sans text-cavernous-700 dark:text-cavernous-50 rounded-md shadow-md shadow-cavernous-100 dark:shadow-cavernous-950 dark:shadow-md";
    return (
        <div className={className}>
            {param.children}
        </div>
    )
}

const App = () => {
    const { pathname: location } = useLocation();
    return (
        <React.StrictMode >
            <Section className="min-w-full" >
                <GlobalNavBar minWidth={600} />
            </Section>
            <div className="flex justify-center">
                <Section className="sm:w-11/12 md:max-w-5xl w-full px-4 py-2 sm:py-4">
                    {location == '/' ? <Home /> : <Outlet />}
                </Section>
            </div>
        </React.StrictMode>
    )
}

export default App;
