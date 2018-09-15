import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import './BookSearchBar.css'

const reg = new RegExp(/\/search/, 'g');

class BookSearchBar extends Component {
    static defaultProps = {
        title: 'Title',
    }

    render() {
        
        const isSearching = this.props.location.pathname.match( reg );

        return(
            <div className='search-bar'>
                <div className='search-title'>{this.props.title}</div>
                <div className='search'>

                    { !isSearching && (
                        
                        <Link className='search-icon' to='/search'>
                            <span><i className="fas fa-search"/></span>
                        </Link>

                    )}

                    { isSearching && (

                        <div>
                            <Link className='search-icon' to='/'>
                                <span><i className="fas fa-arrow-left"/></span>
                            </Link>

                            <input className='search-input' type='text' autoFocus={true}
                                placeholder='Search books' 
                                onChange={(e) => this.props.onSearchBook( e.target.value )} 
                            />
                        </div>

                    ) }

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