
import React from "react";
import { Routes, Route, Link, BrowserRouter, HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Home from "./views/homepage/Home";


function initializeRoutes(){
    ReactDOM.render((
        <HashRouter>
            <Routes>
                <Route exact path="" element={<Home />} />
                <Route exact path="/:text_url" element={<Home />} />
            </Routes>
        </HashRouter>
    ),document.getElementById('root'))
}

export default initializeRoutes;