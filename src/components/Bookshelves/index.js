import React, { Component } from 'react';
import PropTypes from "prop-types";

import './Bookshelves.css'
import Bookshelf from "../Bookshelf";

class Bookshelves extends Component {
    render() {
        const {booksByShelf, onMoveBook} = this.props;

        return(
            <section className='bookshelves-body'>
                <Bookshelf 
                    books={booksByShelf('currentlyReading')} 
                    shelf="Currently Reading"
                    onMoveBook={onMoveBook} >
                </Bookshelf>
                <Bookshelf 
                    books={booksByShelf('wantToRead')} 
                    shelf="Want to Read"
                    onMoveBook={onMoveBook} >
                </Bookshelf>
                <Bookshelf 
                    books={booksByShelf('read')} 
                    shelf="Read"
                    onMoveBook={onMoveBook} >
                </Bookshelf>
            </section>
        )
    }
}

Bookshelves.propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    booksByShelf: PropTypes.func.isRequired
}

export default Bookshelves;