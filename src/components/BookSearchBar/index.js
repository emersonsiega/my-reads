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
                <div className='search'>
                    <span className='search-icon'><i className="fas fa-search"/></span>
                    <input autoFocus={true}  
                        className='search-input' type='text' placeholder='Search books' 
                        onChange={(e) => this.props.onSearchBook( e.target.value )} />
                </div>
            </div>
        )
    }
}

BookSearchBar.propTypes = {
    title: PropTypes.string.isRequired,
    onSearchBook: PropTypes.func.isRequired
}

export default BookSearchBar;