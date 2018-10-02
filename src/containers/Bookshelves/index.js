import React from 'react';
import PropTypes from "prop-types";

import './Bookshelves.css'
import Bookshelf from "../Bookshelf";

const Bookshelves = ({books, shelves, onMoveBook}) => {
    const booksByShelf = shelf => books.filter(book => book.shelf === shelf);

    return (
        <section className='bookshelves-body'>
            {
                shelves.map( ({name, value}) => (
                    <Bookshelf 
                        key={value}
                        books={booksByShelf(value)} 
                        shelf={name}
                        onMoveBook={onMoveBook} >
                    </Bookshelf>
                ))
            }
        </section>
    )
}

Bookshelves.propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired
}

Bookshelves.defaultProps = {
    books: [],
    shelves: []
}

export default Bookshelves;