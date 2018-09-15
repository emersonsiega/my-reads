import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'typeface-roboto'

import './index.css';
import * as BooksAPI from "./api/BooksAPI";
import BookSearchBar from "./components/BookSearchBar";
import Bookshelves from "./components/Bookshelves";
import Library from "./components/Library";

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

    getShelfLabel = shelf => {
        return this.shelves.find( s => s.value === shelf );
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.updateState(books);
        });
    }

    setShelfToBook = ( book, bookFinded ) => {
        if ( book.id === bookFinded.id) {
            book.shelf = bookFinded.shelf;
        }

        return book;
    }

    showMessage = message => {
        toast.info(message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
        });
    }

    updateState = value => this.setState({ books: value });

    onMoveBook = (book) => {
        BooksAPI.update( book, book.shelf ).then( () => {
            const booksChanged = this.state.books.map( b => this.setShelfToBook( b, book ) );
            this.updateState(booksChanged);
            this.showMessage( `Book moved to ${this.getShelfLabel(book.shelf).name}` );
        } );
    }

    onSearchBook = query => {
        if ( query.length < 3 ) {
            this.setState({ search: [] })
            return;
        }

        BooksAPI.search( query ).then( books => {
            if ( books.error ) {
                this.showMessage( 'No results! Try a different search =)' );
                return;
            }

            const booksMapped = books.map( book => { 
                let stateBook = this.state.books.find( b => b.id === book.id );
                if ( stateBook ) {
                    book.shelf = stateBook.shelf;
                }

                return book;
            } );

            this.setState({search: booksMapped});
        })
    }

    render() {
        return(
            <div>
                <Route render={ (props) => (
                    <div>
                        <BookSearchBar title='MyReads' onSearchBook={this.onSearchBook} {...props} />
                        <ToastContainer
                            position="bottom-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnVisibilityChange
                            draggable={false}
                            pauseOnHover
                        />
                    </div>
                )} />
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
                        <Library books={this.state.search} onMoveBook={this.onMoveBook}></Library>
                    )}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);
