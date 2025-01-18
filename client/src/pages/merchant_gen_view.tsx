import React from 'react';
import Page from './page';
import Markdown from '../components/markdown';
import { useSearchParams } from 'react-router-dom';
import { Navbar, NavbarItem } from '../components/navbar';

const MerchantGenView = () => {
    const [markdown, setMarkdown] = React.useState("");
    const [id, setId] = React.useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchMerchant = (id: string) => {
        if (id.length == 6) {
            const id_formatted = id.toUpperCase();
            const url = `/api/get-p2e-merchant/${id_formatted}`;
            fetch(url).then((res) => {
                res.json().then((json) => {
                    if (json.Failure) {
                        setMarkdown(`No Merchant found with id ${id_formatted} or an error occurred`);
                    } else {
                        setMarkdown(json.Merchant);
                    }
                });
            });
        } else {
            setMarkdown("Id must be 6 characters");
        }
    }

    React.useEffect(() => {
        const paramId = searchParams.get("id");
        if (paramId) {
            setId(paramId);
            fetchMerchant(paramId);
        }
        console.log(paramId);
    }, []);

    return (
        <Page>
            <Navbar>
                <NavbarItem text="View" uri="/merchant-gen/view" />
                <NavbarItem text="Create" uri="/merchant-gen/create" />
            </Navbar>
            <h2>Merchant Id</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                setMarkdown("Pending...");
                fetchMerchant(id);
            }}>
                <input name="merchantId" placeholder={id} onChange={(e) => { setId(e.target.value) }} maxLength={6} className="bg-cavernous-25 dark:bg-cavernous-750 mb-2 sm:mb-4 font-sans text-cavernous-700 dark:text-cavernous-50 rounded-md shadow-md shadow-cavernous-100 dark:shadow-cavernous-950 dark:shadow-md focus:outline-none uppercase" />
            </form>
            <Markdown>{markdown}</Markdown>
        </Page>
    )
}

export default MerchantGenView;
