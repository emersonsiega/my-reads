import React, { Component } from 'react';
import PropTypes from "prop-types";
import StarRatingComponent from "react-star-rating-component";
import Select from "react-select";

import './Book.css'

class Book extends Component {
    static defaultProps = {
        book: {}
    }

    //TODO: use App shelves constant
    options = [
        {value: 'currentlyReading', label: 'Currently Reading'},
        {value: 'wantToRead', label: 'Want to read'},
        {value: 'read', label: 'Read'}
    ]

    onMoveBook = (selected, {action}) => {
        let book = this.props.book;
        if ( action === 'clear' ) {
            book.shelf = 'none'
        } else {
            book.shelf = selected.value;
        }

        this.props.onMoveBook && this.props.onMoveBook( book );
    }

    limitDescription = ({description = ''}) => {
        let descr = description.substring(0, 100);
        return descr.substring(0, descr.lastIndexOf(' ')).concat('...');
    }

    render() {

        const {book} = this.props;

        return(
            <article className='book-card'>
                <div className='book-header'>
                    <label className='book-title'>{book.title}</label>
                    <label className='book-subtitle'>{book.subtitle}</label>
                </div>
                <div className='book-content'>
                    <div className='book-cover' style={{backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                    <div className='book-details'>
                        <label className='book-author'>{book.authors && book.authors.join(', ')}</label>
                        <label className='book-description'>{this.limitDescription(book)}</label>
                        <div className='book-rating'>
                            <StarRatingComponent
                                name='rating'
                                value={book.averageRating}
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
                            <label>{book.ratingsCount || 0} ratings</label>
                        </div>
                    </div>
                </div>
                <div className='book-footer'>
                    <a className='book-link book-footer-content' target='_blank' href={book.previewLink}>
                        Preview book
                    </a>
                    <Select className='book-options book-footer-content'
                        isMulti={false}
                        isSearchable={false}
                        isClearable={true}
                        placeholder='Move to...'
                        value={this.options.filter( i => i.value === book.shelf )[0]}
                        onChange={this.onMoveBook}
                        menuPosition='fixed'
                        menuShouldBlockScroll={true}
                        options={this.options}
                    />
                </div>
            </article>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired
}

export default Book;