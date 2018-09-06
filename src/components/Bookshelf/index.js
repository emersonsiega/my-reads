import React, { Component } from 'react';
import './Bookshelf.css'

class Bookshelf extends Component {
    render() {
        return(
            <div>
                <h1>{this.props.shelf}</h1>
                <ul>
                    {this.props.books.map( book => (
                        <li key={book.id}>
                            {book.title}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Bookshelf;