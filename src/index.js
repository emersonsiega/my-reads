import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

import './index.css';
import 'typeface-roboto'

import App from "./views/App";

ReactDOM.render(
    <HashRouter basename={process.env.PUBLIC_URL}>
        <App />
    </HashRouter>, 
    document.getElementById('root')
);
