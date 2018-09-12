import React, { Component } from 'react';
import { Route } from "react-router-dom";

import './Bookshelves.css'
import * as BooksAPI from "../../api/BooksAPI";
import Bookshelf from "../Bookshelf";
import BookSearchBar from "../BookSearchBar";

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

    onMoveBook = book => {
        BooksAPI.update( book, book.shelf ).then( () => {
            const booksChanged = this.state.books.map( b => {
                if ( b.id === book.id) {
                    b.shelf = book.shelf;
                }

                return b;
            });
            
            this.setState({
                books: booksChanged
            });
        } );
    }

    render() {
        return(
            <div>
                <BookSearchBar title='MyReads'/>
                <div className='bookshelves-body'>
                    <Route
                        exact
                        path='/'
                        render={ () => (
                            <div>
                                <Bookshelf 
                                    books={this.booksByShelf('currentlyReading')} 
                                    shelf="Currently Reading"
                                    onMoveBook={this.onMoveBook} >
                                </Bookshelf>
                                <Bookshelf 
                                    books={this.booksByShelf('wantToRead')} 
                                    shelf="Want to Read"
                                    onMoveBook={this.onMoveBook} >
                                </Bookshelf>
                                <Bookshelf 
                                    books={this.booksByShelf('read')} 
                                    shelf="Read"
                                    onMoveBook={this.onMoveBook} >
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
            </div>
        )
    }
}

export default Bookshelves;