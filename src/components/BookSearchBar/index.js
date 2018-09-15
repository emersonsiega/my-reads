import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {DebounceInput} from 'react-debounce-input';

import './BookSearchBar.css'

const reg = new RegExp(/\/search/, 'g');

class BookSearchBar extends Component {
    static defaultProps = {
        title: 'Title'
    }

    state = {
        value: ''
    }

    updateValue = e => {
        let value = e.target.value || ''

        this.setState( {
            value: value
        })

        this.props.onSearchBook( value );
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
                            <Link className='search-icon' onClick={this.updateValue} to='/'>
                                <span><i className="fas fa-arrow-left"/></span>
                            </Link>

                            <DebounceInput className='search-input' type='text' autoFocus={true}
                                value={this.state.value}
                                placeholder='Search books' minLength={3} debounceTimeout={300}
                                onChange={this.updateValue} 
                            />
                            
                            <button className='clear-icon' onClick={this.updateValue}
                                style={ {visibility: this.state.value.length > 0 ? 'visible' : 'hidden' }  }>
                                <i className="fas fa-times"/>
                            </button>
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