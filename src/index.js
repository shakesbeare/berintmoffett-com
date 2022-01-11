import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Favicon from 'react-favicon'

import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Compositions from "./pages/Compositions";
import TTRPG from "./pages/TTRPG";
import About from "./pages/About";
import Arcane from "./pages/ttrpg/Arcane"
import Strixhaven from "./pages/ttrpg/Strixhaven"
import './css/index.css';

import reportWebVitals from './reportWebVitals';

// This is the router for the  main navbar
const Router = () => {
  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path="compositions" element={<Compositions />} />
          
          <Route path="tabletop-rpg" element={<TTRPG />}>
            <Route path="arcane" element={<Arcane />} />
            <Route path="strixhaven" element={<Strixhaven />} />

          </Route>
          <Route path="about-me" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// This is the main application
// This creates the router object as well as
// sets default document title and favicon
export default function App() {
  return (
    <div>
      <Favicon url='../public/favicon.ico' />
      <DocumentTitle title='Berint Moffett - Home'>
        <Router />
      </DocumentTitle>    
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

reportWebVitals();
