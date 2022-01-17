import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Favicon from 'react-favicon'
import { Auth0Provider } from '@auth0/auth0-react';

import NavBar from "./pages/NavBar";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Compositions from "./pages/Compositions";
import TTRPGNavBar from "./pages/TTRPGNavBar";
import About from "./pages/About";
import Arcane from "./pages/ttrpg/Arcane"
import Strixhaven from "./pages/ttrpg/Strixhaven"
import Profile from "./pages/Profile";
import './css/index.css';

// This is the router for the  main navbar
const Router: React.FC = () => {
  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path="compositions" element={<Compositions />} />
          
          <Route path="tabletop-rpg" element={<TTRPGNavBar />}>
            <Route path="arcane" element={<Arcane />} />
            <Route path="strixhaven" element={<Strixhaven />} />

          </Route>
          <Route path="about-me" element={<About />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// This is the main application
// This creates the router object as well as
// sets default document title and favicon

const App: React.FC = () => {
  return (
    <div>
      <Favicon url='favicon.ico' />
      <DocumentTitle title='Berint Moffett'>
        <Router />
      </DocumentTitle>    
    </div>
  )
}

ReactDOM.render(
  <Auth0Provider
    domain='dev-4diwe6ft.us.auth0.com'
    clientId='onRQDePHSHOZSerpcOTI2KDFTgi1c2qu'
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
document.getElementById('root')
)
