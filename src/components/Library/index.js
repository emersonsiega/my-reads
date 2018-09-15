import React, { Component } from 'react';
import PropTypes from "prop-types";

import './Library.css'
import Book from "../Book";

class Library extends Component {
    static defaultProps = {
        books: []
    }

    render() {
        const {books, onMoveBook} = this.props;

        return (
            <div className='library-body'>
                { books.length === 0 && (
                    <label className='empty-message'>
                        Type something to search a book!
                    </label>
                )}
                
                { books.length > 0 && (
                    <div className='library-list'>
                        {books.map( book => (
                            <Book key={book.id} book={book} onMoveBook={onMoveBook}></Book>
                        ))}
                    </div>
                )}

            </div>
        );
    }
}

Library.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMoveBook: PropTypes.func.isRequired
}

export default Library;