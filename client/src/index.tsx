import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './app';
import About from './pages/about';
import Lessons from './pages/lessons';
import Composition from './pages/composition';
import Programming from './pages/programming';
import Contact from './pages/contact';
import Login from './pages/login';
import ErrorPage from './pages/error_page';
import SnakeLeaderboard from './pages/snake_leaderboard';
import MerchantGenView from './pages/merchant_gen/merchant_gen_view';
import MerchantGenCreate from './pages/merchant_gen/merchant_gen_create';
import MerchantGen from './pages/merchant_gen/merchant_gen';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: '*',
                element: <ErrorPage />,
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'lessons',
                element: <Lessons />
            },
            {
                path: 'composition',
                element: <Composition />
            },
            {
                path: 'programming',
                element: <Programming />,
            },
            {
                path: 'snake-leaderboard',
                element: <SnakeLeaderboard />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'merchant-gen',
                element: <MerchantGen />,
            },
            {
                path: 'merchant-gen/view',
                element: <MerchantGenView />,
            },
            {
                path: 'merchant-gen/create',
                element: <MerchantGenCreate />,
            },
            {
                path: 'login',
                element: <Login />
            }
        ]
    },
]);

let root = document.getElementById("root");
if (root != null) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

