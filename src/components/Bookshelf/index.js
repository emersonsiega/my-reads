import React, { Component } from 'react';
import PropTypes from "prop-types";

import './Bookshelf.css'
import Book from "../Book";

class Bookshelf extends Component {
    static defaultProps = {
        shelf: 'Bookshelf',
        books: []
    }

    static defaultProps={
        options: [
            {value: 'currentlyReading', label: 'Currently Reading'},
            {value: 'wantToRead', label: 'Want to read'},
            {value: 'read', label: 'Read'}
        ]
    }

    render() {
        return(
            <section className='bookshelf'>
                <div className='shelf-title'>{this.props.shelf}</div>
                <div className='bookshelf-container'>
                    <div className='books-list'>
                        {this.props.books.map( book => (
                            <Book key={book.id} book={book} onMoveBook={this.props.onMoveBook} 
                                options={this.props.options}/>
                        ))}
                    </div>
                </div>
            </section>
        )
    }
}

Bookshelf.propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
}

export default Bookshelf;