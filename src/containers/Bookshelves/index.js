import React, { Component } from 'react';
import PropTypes from "prop-types";

import './Bookshelves.css'
import Bookshelf from "../Bookshelf";

class Bookshelves extends Component {
    static defaultProps = {
        books: [],
        shelves: []
    }

    booksByShelf = shelf => this.props.books.filter(book => book.shelf === shelf);

    render() {
        const {shelves, onMoveBook} = this.props;

        return(
            <section className='bookshelves-body'>
                {
                    shelves.map( ({name, value}) => (
                        <Bookshelf 
                            key={value}
                            books={this.booksByShelf(value)} 
                            shelf={name}
                            onMoveBook={onMoveBook} >
                        </Bookshelf>
                    ))
                }
            </section>
        )
    }
}

Bookshelves.propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Bookshelves;