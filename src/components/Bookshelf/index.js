import React, { Component } from 'react';
import PropTypes from "prop-types";

import './Bookshelf.css'
import Book from "../Book";

class Bookshelf extends Component {
    static defaultProps = {
        shelf: 'Bookshelf',
        books: []
    }

    render() {
        return(
            <div className='bookshelf'>
                <div className='shelf-title'>{this.props.shelf}</div>
                <div className='bookshelf-container'>
                    <div className='books-list'>
                        {this.props.books.map( book => (
                            <Book key={book.id} book={book} onMoveBook={this.props.onMoveBook}></Book>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

Bookshelf.propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
}

export default Bookshelf;