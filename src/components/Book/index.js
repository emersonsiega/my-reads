import React, { Component } from 'react';
import PropTypes from "prop-types";
import StarRatingComponent from "react-star-rating-component";
import Select from "react-select";

import './Book.css'

class Book extends Component {
    static defaultProps = {
        book: {}
    }

    onMoveBook = (selected, {action}) => {
        let book = this.props.book;
        if ( action === 'clear' ) {
            book.shelf = 'none'
        } else {
            book.shelf = selected.value;
        }

        this.props.onMoveBook && this.props.onMoveBook( book );
    }

    render() {
        const limitDescription = ({description}) => {
            let descr = description.substring(0, 100);
            return descr.substring(0, descr.lastIndexOf(' ')).concat('...');
        }

        const options = [
            {value: 'currentlyReading', label: 'Currently Reading'},
            {value: 'wantToRead', label: 'Want to read'},
            {value: 'read', label: 'Read'}
        ]

        return(
            <div className='book-card'>
                <div className='book-header'>
                    <label className='book-title'>{this.props.book.title}</label>
                    <label className='book-subtitle'>{this.props.book.subtitle}</label>
                </div>
                <div className='book-content'>
                    <div className='book-cover' style={{backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}></div>
                    <div className='book-details'>
                        <label className='book-author'>{this.props.book.authors.join(', ')}</label>
                        <label className='book-description'>{limitDescription(this.props.book)}</label>
                        <div className='book-rating'>
                            <StarRatingComponent
                                name='rating'
                                value={this.props.book.averageRating}
                                starCount={5}
                                editing={false}
                                starColor="#ffb400"
                                emptyStarColor="#ffb400"
                                renderStarIcon={(index, value) => {
                                    return (
                                      <span style={{fontSize: 21}}>
                                        <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                                      </span>
                                    );
                                  }}
                                  renderStarIconHalf={() => {
                                    return (
                                      <span style={{fontSize: 21}}>
                                        <span style={{position: 'absolute'}}><i className="far fa-star" /></span>
                                        <span><i className="fas fa-star-half" />
                                        </span>
                                      </span>
                                    );
                                  }}
                            />
                            <label>{this.props.book.ratingsCount || 0} ratings</label>
                        </div>
                    </div>
                </div>
                <div className='book-footer'>
                    <a className='book-link book-footer-content' target='_blank' href={this.props.book.previewLink}>
                        Preview book
                    </a>
                    <Select className='book-options book-footer-content'
                        isMulti={false}
                        isSearchable={false}
                        isClearable={true}
                        placeholder='Move to...'
                        value={options.filter( i => i.value === this.props.book.shelf )[0]}
                        onChange={this.onMoveBook}
                        menuPosition='fixed'
                        menuShouldBlockScroll={true}
                        options={options}
                    />
                </div>
            </div>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired
}

export default Book;