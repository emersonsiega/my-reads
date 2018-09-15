import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import './BookSearchBar.css'

class BookSearchBar extends Component {
    static defaultProps = {
        title: 'Title',
        value: ''
    }

    render() {
        return(
            <div className='search-bar'>
                <div className='search-title'>{this.props.title}</div>
                <div className='search'>

                    { !this.props.searching && (
                        
                        <Link className='search-icon' to='/search'>
                            <span><i className="fas fa-search"/></span>
                        </Link>

                    )}

                    { this.props.searching && (

                        <Link className='search-icon' to='/'>
                            <span><i className="fas fa-arrow-left"/></span>
                        </Link>

                     )}

                    { this.props.searching && (

                        <input className='search-input' type='text' autoFocus={true}  
                            value={this.props.value}
                            placeholder='Search books' 
                            onChange={(e) => this.props.onSearchBook( e.target.value )} />

                    ) }

                </div>
            </div>
        )
    }
}

BookSearchBar.propTypes = {
    title: PropTypes.string.isRequired,
    onSearchBook: PropTypes.func.isRequired,
    value: PropTypes.string,
    searching: PropTypes.bool.isRequired
}

export default BookSearchBar;