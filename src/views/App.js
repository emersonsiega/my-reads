import React, {Component} from 'react';
import { Route } from "react-router-dom";

import './App.css'
import BooksAPI from "../service/BooksAPI";
import BookSearchBar from "../components/BookSearchBar";
import {Toast, ShowMessage} from "../components/Toast";
import Bookshelves from "../containers/Bookshelves";
import Library from "../containers/Library";

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: [],
            books: [],
            loading: true
        };

        this.getShelfLabel = this.getShelfLabel.bind(this)
        this.onMoveBook = this.onMoveBook.bind(this)
        this.onSearchBook = this.onSearchBook.bind(this)
        this.mapBooksToShelf = this.mapBooksToShelf.bind(this)
    }

    static defaultProps = {
        shelves: [
            { value: 'currentlyReading', name: 'Currently reading' },
            { value: 'wantToRead', name: 'Want to read' },
            { value: 'read', name: 'Read' }
        ]
    }

    getShelfLabel (shelf) {
        return this.props.shelves.find( s => s.value === shelf );
    }

    componentDidMount() {
        BooksAPI.getAll(
            (books) => {
                this.setState({
                    books: books,
                    loading: false
                });
            }, 
            () => ShowMessage('Failed to load books! =/')
        );
    }

    setShelfToBook = ( book, bookFinded ) => {
        if ( book.id === bookFinded.id) {
            book.shelf = bookFinded.shelf;

            if ( book.shelf === 'none' ) {
                book.shelf = undefined;
            }
        }

        return book;
    }

    onMoveBook (book) {
        BooksAPI.update( book, book.shelf, (data) => {
            if ( data && data[book.shelf].length === 0 ) return;

            // TODO: improve this method
            const booksChanged = this.state.books.map( b => this.setShelfToBook( b, book ) );
            if ( !booksChanged.includes( book ) ) {
                booksChanged.push(book);
            }
            
            this.setState({ books: booksChanged })

            if ( book.shelf && book.shelf !== 'none' ) {
                ShowMessage( `Book moved to ${this.getShelfLabel(book.shelf).name}` );
            } else {
                ShowMessage( `Book removed from bookshelf` );
            }
        },
        () => {
            ShowMessage( `Failed to move Book! =/` );
        } );
    }

    mapBooksToShelf(books) {
        const booksMapped = books.map( book => { 
            //TODO: find a way to avoid this find inside a map
            let stateBook = this.state.books.find( b => b.id === book.id );
            book.shelf = stateBook ? stateBook.shelf : 'none';

            return book;
        } );

        return booksMapped;
    }

    onSearchBook(query) {
        if ( query.length < 3 ) {
            this.setState({ search: [] })
            return;
        }

        BooksAPI.search( query, 
            (books) => {
                let booksMapped = []

                if ( books.error ) {
                    ShowMessage( 'No results! Try a different search =)' );
                } else {
                    booksMapped = this.mapBooksToShelf( books );
                }

                this.setState({search: booksMapped});
            },
            () => { 
                this.setState({search: []});
                ShowMessage(`Failed to search books! =/`) 
            }
        )
    }

    render() {
        return (
            <div>
                <Route render={ (props) => (<BookSearchBar title='MyReads' onSearchBook={this.onSearchBook} {...props} />)} />
                <Route component={Toast}/>
                <Route exact path='/' render={ () => (
                    <div>
                        {this.state.loading ?
                            <div className='loading-message'>Loading...</div> :
                            <Bookshelves books={this.state.books} onMoveBook={this.onMoveBook} shelves={this.props.shelves} />}
                    </div>
                )} />
                <Route path='/search' render={ () => (
                    <Library books={this.state.search} onMoveBook={this.onMoveBook}></Library>
                )} />
            </div>
        );
    }
}

export default App;