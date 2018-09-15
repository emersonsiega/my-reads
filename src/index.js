import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import 'typeface-roboto'

import './index.css';
import * as BooksAPI from "./api/BooksAPI";
import BookSearchBar from "./components/BookSearchBar";
import Bookshelves from "./components/Bookshelves";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            lastSearch: localStorage.lastSearch || '',
            search: []
        };
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

        localStorage.lastSearch = query;

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
                <Route
                    exact
                    path='/'
                    component={ () => (
                        <div>
                            <BookSearchBar title='MyReads' onSearchBook={this.onSearchBook} searching={false} />
                            <Bookshelves onMoveBook={this.onMoveBook} booksByShelf={this.booksByShelf} />
                        </div>
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
