import React from 'react';
import { Navbar, NavbarItem } from '../components/navbar';
import Page from './page';

const MerchantGen = () => {
    return (
    <Page>
        <Navbar>
            <NavbarItem text="View" uri="/merchant-gen/view" />
            <NavbarItem text="Create" uri="/merchant-gen/create" />
        </Navbar>
    </Page>
    )
}

export default MerchantGen;
