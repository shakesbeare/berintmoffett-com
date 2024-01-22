import React from 'react';
import { useRouteError } from 'react-router-dom';
import Page from './page';

const ErrorPage = () => {
    return (
        <Page> 
            <div className="text-center text-3xl" >Oops!</div>
            <p className="text-center" >The requested content was not found</p>
        </Page>
    )
}

export default ErrorPage;
