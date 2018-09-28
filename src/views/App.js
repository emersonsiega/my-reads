import React, {Component} from 'react';
import { Route } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import BooksAPI from "../service/BooksAPI";
import BookSearchBar from "../components/BookSearchBar";
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
        BooksAPI.getAll().then( (books) => {
            if (!books) {
                this.showMessage('Failed to load books! =/')
                return
            }

            this.setState({
                books: books,
                loading: false
            });
        });
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

    showMessage = message => {
        toast.info(message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
        })
    }

    onMoveBook (book) {
        BooksAPI.update( book, book.shelf).then( (data) => {
            if ( !data || (data && data[book.shelf].length === 0) ) {
                this.showMessage(`Failed to move Book! =/`)
                return
            }

            // TODO: improve this method
            const booksChanged = this.state.books.map( b => this.setShelfToBook( b, book ) );
            console.log( booksChanged )
            if ( !booksChanged.includes( book ) ) {
                console.log( `caiu no includes` )
                booksChanged.push(book);
            }
            
            this.setState({ books: booksChanged })

            if ( book.shelf && book.shelf !== 'none' ) {
                this.showMessage( `Book moved to ${this.getShelfLabel(book.shelf).name}` );
            } else {
                this.showMessage( `Book removed from bookshelf` );
            }
        });
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
            return
        }

        BooksAPI.search( query ).then((books) => {
            let booksMapped = []

            if ( !books ) {
                this.setState({ search: [] })
                this.showMessage(`Failed to search books! =/`)
                return
            }

            if ( books.error ) {
                this.showMessage( 'No results! Try a different search =)' )
            } else {
                booksMapped = this.mapBooksToShelf( books )
            }

            this.setState({search: booksMapped})
        })
    }

    render() {
        return (
            <div>
                <Route render={ (props) => (<BookSearchBar title='MyReads' onSearchBook={this.onSearchBook} {...props} />)} />
                <Route render={ () => (
                    <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop 
                        closeOnClick rtl={false} pauseOnVisibilityChange draggable={false} pauseOnHover 
                    />
                )}/>
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