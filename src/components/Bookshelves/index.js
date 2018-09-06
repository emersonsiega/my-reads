import React, { Component } from 'react';
import { Route } from "react-router-dom";

import './Bookshelves.css'
import Bookshelf from "../Bookshelf";
import * as BooksAPI from "../../api/BooksAPI";

class Bookshelves extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            })
        });
    }

    booksByShelf( shelf ) {
        return this.state.books.filter(book => book.shelf === shelf);
    }

    render() {
        return(
            <div>
                <Route
                    exact
                    path='/'
                    render={ () => (
                        <div>
                            <Bookshelf 
                                books={this.booksByShelf('currentlyReading')} 
                                shelf="Currently Reading">
                            </Bookshelf>
                            <Bookshelf 
                                books={this.booksByShelf('wantToRead')} 
                                shelf="Want to Read">
                            </Bookshelf>
                            <Bookshelf 
                                books={this.booksByShelf('read')} 
                                shelf="Read">
                            </Bookshelf>
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