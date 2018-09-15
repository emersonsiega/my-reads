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

    static defaultProps = {
        search: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            })
        });
    }

    booksByShelf = shelf => this.state.books.filter(book => book.shelf === shelf);

    setShelfToBook = ( book, bookFinded ) => {
        if ( book.id === bookFinded.id) {
            book.shelf = bookFinded.shelf;
        }

        return book;
    }

    onMoveBook = book => {
        BooksAPI.update( book, book.shelf ).then( () => {
            const booksChanged = this.state.books.map( b => this.setShelfToBook( b, book ) );
            
            this.setState({
                books: booksChanged
            });
        } );
    }

    // TODO: Refactor this
    onSearchBook = query => {
        if ( query.length < 3 ) {
            return
        }

        BooksAPI.search( query ).then( books => {
            const booksMapped = books.map( book => { 
                let stateBook = this.state.books.find( b => b.id === book.id );
                if ( stateBook ) {
                    book.shelf = stateBook.shelf;
                }

                return book;
            } );

            this.search = booksMapped;
        } )
    }

    render() {
        return(
            <div>
                <BookSearchBar title='MyReads' onSearchBook={this.onSearchBook} />
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