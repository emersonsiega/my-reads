import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import './Bookshelf.css'
import Book from "../../components/Book";

class Bookshelf extends Component {
    static defaultProps = {
        shelf: '',
        books: [],
        options: [
            { value: 'currentlyReading', label: 'Currently Reading' },
            { value: 'wantToRead', label: 'Want to read' },
            { value: 'read', label: 'Read' }
        ]
    }

    render() {
        const hasBooks = () => this.props.books.length > 0;

        return(
            <section className='bookshelf'>
                <div className='shelf-title'>{this.props.shelf}</div>
                <div className='bookshelf-container'>
                    <div className='books-list'>
                        { hasBooks() ?
                            this.props.books.map( book => (
                                <Book key={book.id} book={book} onMoveBook={this.props.onMoveBook} 
                                    options={this.props.options}/>
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
}

Bookshelf.propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
}

export default Bookshelf;