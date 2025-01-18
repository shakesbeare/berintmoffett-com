import React from 'react';
import Page from './page';
import Markdown from 'react-markdown';
import { Navbar, NavbarItem } from '../components/navbar';

const MerchantGenCreate = () => {
    const [message, setMessage] = React.useState("");
    const [level, setLevel] = React.useState(0);

    return (
        <Page>
            <Navbar>
                <NavbarItem text="View" uri="/merchant-gen/view" />
                <NavbarItem text="Create" uri="/merchant-gen/create" />
            </Navbar>
            <h2>Create New Merchant</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (level > 20 || level < 1) {
                    setMessage("Level must be between 1 and 20 inclusive");
                    return;
                }

                fetch(`/api/create-p2e-merchant/${level}`).then((res) => {
                    res.text().then((text) => {
                        window.location.replace(`/merchant-gen/view?id=${text}`);
                    })
                })

            }}>
                <input name="merchantLevel" placeholder="Merchant Level"
                    onChange={(e) => {
                        setLevel(parseInt(e.target.value));
                    }}
                    onKeyDown={(e) => {
                        if (e.key != "Backspace" && e.key != "Enter" && !/[0-9]/.test(e.key)) {
                            e.preventDefault();
                        }

                    }}
                    maxLength={2} className="bg-cavernous-25 dark:bg-cavernous-750 mb-2 sm:mb-4 font-sans text-cavernous-700 dark:text-cavernous-50 rounded-md shadow-md shadow-cavernous-100 dark:shadow-cavernous-950 dark:shadow-md focus:outline-none" />
            </form>
            <Markdown>{message}</Markdown>
        </Page>
    )
}

export default MerchantGenCreate;
