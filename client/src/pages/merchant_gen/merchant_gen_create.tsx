import React from 'react';
import Page from '../page';
import Markdown from 'react-markdown';
import { MerchantNavBar } from './merchant_gen';

const MerchantGenCreate = () => {
    const [message, setMessage] = React.useState("");
    const [level, setLevel] = React.useState(0);

    return (
        <Page>
            <MerchantNavBar />
            <h1 className="text-xl">Create New Merchant</h1>
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
                <input name="merchantLevel" type="number" max="20" min="1" inputMode="numeric" placeholder="Level 1-20"
                    onChange={(e) => {
                        setLevel(parseInt(e.target.value));
                    }}
                    maxLength={2} pattern="\d*" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1 w-48 ring-1 ring-cavernous-600 h-8 bg-cavernous-25 dark:bg-cavernous-750 mb-2 sm:mb-4 font-sans text-cavernous-700 dark:text-cavernous-50 rounded-md shadow-md shadow-cavernous-100 dark:shadow-cavernous-950 dark:shadow-md focus:outline-none uppercase" />
                <button type="submit" className="m-2 h-8 w-16 hover:bg-light_blue hover:text-cavernous-700 bg-cavernous-600 rounded-md shadow-md shadow-cavernous-100 dark:shadow-cavernous-950" >Search</button>
            </form>
            <Markdown>{message}</Markdown>
        </Page>
    )
}

export default MerchantGenCreate;
