import React from 'react';
import Page from './page';
import TwoColumn from '../components/two_column';

const Contact = () => {
    return (
        <Page>
            <div className="text-3xl text-center">Thanks for your interest!</div>
            <br />
            <TwoColumn>
                <div className="text-center">
                    (208) 867-9906
                </div>
                <div className="text-center">
                    berint.moffett@gmail.com
                </div>
            </TwoColumn>
            <br />
        </Page>
    )
}

export default Contact;
