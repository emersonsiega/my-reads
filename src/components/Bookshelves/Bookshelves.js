import React, { Component } from 'react';
import { Route } from "react-router-dom";

import './Bookshelves.css'
import Bookshelf from "../Bookshelf/Bookshelf";

class Bookshelves extends Component {
    render() {
        return(
            <div>
                <Route
                    exact
                    path='/'
                    render={ () => (
                        <div>
                            <Bookshelf shelf="Currently Reading"></Bookshelf>
                            <Bookshelf shelf="Want to Read"></Bookshelf>
                            <Bookshelf shelf="Read"></Bookshelf>
                        </div>
                    )}
                />
                <Route
                    path='/search'
                    render={ () => (
                        <div></div>
                    )}
                />
            </div>
        )
    }
}

export default Bookshelves;