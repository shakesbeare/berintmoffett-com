import React from 'react';
import { Navbar, NavbarItem } from '../../components/navbar';
import Page from '../page';

export const MerchantNavBar = () => {
    const itemClass = "mb-2 rounded-md";
    return (
        <Navbar>
            <NavbarItem text="View" uri="/merchant-gen/view" className={itemClass}/>
            <NavbarItem text="Create" uri="/merchant-gen/create" className={itemClass}/>
        </Navbar>
    )
}

const MerchantGen = () => {
    return (
    <Page>
        <MerchantNavBar />
    </Page>
    )
}

export default MerchantGen;
