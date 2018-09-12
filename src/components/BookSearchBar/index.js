import React, { Component } from 'react';
import PropTypes from "prop-types";

import './BookSearchBar.css'

class BookSearchBar extends Component {
    static defaultProps = {
        title: 'Title'
    }

    render() {
        return(
            <div className='search-bar'>
                <div className='search-title'>{this.props.title}</div>
                <input className='search-input' type='text' placeholder='Search books' onChange={() => {}} />
            </div>
        )
    }
}

BookSearchBar.propTypes = {
    title: PropTypes.string.isRequired
}

export default BookSearchBar;