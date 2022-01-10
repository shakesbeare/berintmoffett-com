import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Compositions from "./pages/Compositions";
import TTRPG from "./pages/TTRPG";
import About from "./pages/About";

import './css/index.css';
import reportWebVitals from './reportWebVitals';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="compositions" element={<Compositions />} />
          <Route path="tabletop-gaming" element={<TTRPG />} />
          <Route path="about-me" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

reportWebVitals();
