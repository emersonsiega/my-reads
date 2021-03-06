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
        this.mapShelfByBookId = this.mapShelfByBookId.bind(this)
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
        BooksAPI.update( book, book.shelf ).then( (data) => {
            if ( !data ) {
                this.showMessage(`Failed to move Book! =/`)
                return
            }

            const {books} = this.state
            const existsInState = books.filter( b => b.id === book.id ).length > 0
            const existsInApi = book.shelf !== 'none' && data[book.shelf].includes(book.id)

            if ( !existsInState && existsInApi ) {
                this.setState({
                    books: [...books, book]
                })
            } else if ( existsInState ) {
                const booksChanged = books.filter( b => b.id !== book.id )

                if ( existsInApi ) {
                    booksChanged.push(book)
                }

                this.setState({ books: booksChanged })
            }

            // Update search books
            const searchBooks = this.mapBooksToShelf( this.state.search )
            this.setState({ search: searchBooks })

            if ( existsInApi ) {
                this.showMessage( `Book moved to ${this.getShelfLabel(book.shelf).name}` );
            } else {
                this.showMessage( `Book removed from bookshelf` );
            }
        });
    }

    mapShelfByBookId() {
        const shelfByBook = this.state.books.reduce((acc, cv) => {
            acc[cv.id] = cv.shelf; 
            return acc
        }, {})

        return shelfByBook;
    }

    mapBooksToShelf(books) {
        const shelfByBook = this.mapShelfByBookId()

        const booksWithShelf = books.map(b => {
            b.shelf = shelfByBook[b.id] ? shelfByBook[b.id] : 'none'
            return b
        })

        return booksWithShelf;
    }

    onSearchBook(query) {
        if (query.length === 0) {
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