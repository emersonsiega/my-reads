import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import 'typeface-roboto'

import './index.css';
import * as BooksAPI from "./api/BooksAPI";
import BookSearchBar from "./components/BookSearchBar";
import Bookshelves from "./components/Bookshelves";

class App extends Component {
    state = {
        search: [],
        books: []
    };

    shelves = [
        { value: 'currentlyReading', name: 'Currently reading' },
        { value: 'wantToRead', name: 'Want to read' },
        { value: 'read', name: 'Read' }
    ]

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            })
        });
    }

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

            this.setState({search: booksMapped});
        } )
    }

    render() {
        return(
            <div>
                <Route
                    exact
                    path='/'
                    component={ () => (
                        <Bookshelves books={this.state.books} onMoveBook={this.onMoveBook} shelves={this.shelves} />
                    )}
                />
                <Route
                    path='/search'
                    render={ () => (
                        <div>
                            <BookSearchBar title='MyReads' onSearchBook={this.onSearchBook} 
                                value={this.state.lastSearch} searching={true} />
                            <div style={{
                                paddingTop: '72px',
                                background: '#fff'
                            }}>
                                <label style={{display: 'flex', justifyContent: 'center', padding: '20px', color: '#989898', fontWeight: 200, fontSize: '2em'}}>
                                    Type something to search a book!
                                </label>
                            </div>
                        </div>
                    )}
                />
            </div>
        );
    }
}

//TODO: Continue...
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);
