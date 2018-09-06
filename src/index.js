import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import Bookshelves from "./components/Bookshelves";

//TODO: Continue...
ReactDOM.render(
    <BrowserRouter>
         <Bookshelves />
    </BrowserRouter>, 
    document.getElementById('root')
);
