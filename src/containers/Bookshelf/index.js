import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import './Bookshelf.css'
import Book from "../../components/Book";

const Bookshelf = ({books, shelf, options, onMoveBook}) => {
    const hasBooks = () => books.length > 0

    return (
        <section className='bookshelf'>
            <div className='shelf-title'>{shelf}</div>
            <div className='bookshelf-container'>
                <div className='books-list'>
                    { hasBooks() ?
                        books.map( book => (
                            <Book key={book.id} book={book} onMoveBook={onMoveBook} 
                                options={options}/>
                        )) 
                        :
                        <div className='empty-message'>
                            How about 
                            <Link className='empty-message-link' to='/search'> add </Link> 
                            some books here?
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

Bookshelf.propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
}

Bookshelf.defaultProps = {
    shelf: '',
    books: [],
    options: [
        { value: 'currentlyReading', label: 'Currently Reading' },
        { value: 'wantToRead', label: 'Want to read' },
        { value: 'read', label: 'Read' }
    ]
}

export default Bookshelf;