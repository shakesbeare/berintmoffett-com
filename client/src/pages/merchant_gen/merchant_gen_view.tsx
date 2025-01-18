import React from 'react';
import Page from '../page';
import Markdown from '../../components/markdown';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { MerchantNavBar } from './merchant_gen';


const MerchantGenView = () => {
    const [markdown, setMarkdown] = React.useState("");
    const [id, setId] = React.useState("");
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

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
                        const paramId = searchParams.get("id");
                        if (!paramId || paramId != id.toString()) {
                            navigate(`/merchant-gen/view?id=${id}`);
                        }
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
    }, [location, navigate]);

    return (
        <Page>
            <MerchantNavBar />
            <h1 className="text-xl">View Merchant Inventory</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                setMarkdown("Pending...");
                fetchMerchant(id);
            }}>
                <input name="merchantId" placeholder="6-character ID" defaultValue={id} onChange={(e) => { setId(e.target.value) }} maxLength={6} className="focus:ring-blue-500 w-48 p-1 ring-1 ring-cavernous-600 h-8 bg-cavernous-25 dark:bg-cavernous-750 mb-2 sm:mb-4 font-sans text-cavernous-700 dark:text-cavernous-50 rounded-md shadow-md shadow-cavernous-100 dark:shadow-cavernous-950 dark:shadow-md focus:outline-none uppercase" />
                <button type="submit"className = "m-2 h-8 w-16 hover:bg-light_blue hover:text-cavernous-700 bg-cavernous-600 rounded-md shadow-md shadow-cavernous-100 dark:shadow-cavernous-950" >Search</button>
            </form>
            <Markdown>{markdown}</Markdown>
        </Page>
    )
}

export default MerchantGenView;
