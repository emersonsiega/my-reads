import React, { Component } from 'react';
import PropTypes from "prop-types";
import StarRatingComponent from "react-star-rating-component";
import ProgressiveImage from "react-progressive-image";
import Select from "react-select";

import './Book.css'

class Book extends Component {
    constructor(props) {
        super(props)

        this.handleMoveBook = this.handleMoveBook.bind(this);
    }

    static defaultProps = {
        book: {},
        options: []
    }

    handleMoveBook (selected, {action}) {
        let book = this.props.book;

        book.shelf = action === 'clear' ? 'none' : selected.value;

        this.props.onMoveBook( book );
    }

    getRatings = ({ratingsCount = 0}) => {
        if ( ratingsCount === 0 )
            return `No rating`
        else if ( ratingsCount === 1 )
            return `${ratingsCount} rating`
        else
            return `${ratingsCount} ratings`
    }

    limitDescription = ({description = ''}) => {
        if ( description.length === 0 ) {
            return 'No description provided...';
        }

        let descr = description.substring(0, 140);
        return descr.trim().concat('...');
    }

    render() {
        const {book, options} = this.props;

        return (
            <article className='book-card'>
                <div className='book-header'>
                    <label className='book-title'>{book.title}</label>
                    <label className='book-subtitle'>{book.subtitle}</label>
                </div>
                <div className='book-content'>
                    <div className='book-cover-container'>
                        <ProgressiveImage src={book.imageLinks ? book.imageLinks.thumbnail : '/img/image-placeholder.png'} placeholder='/img/image-placeholder.png'>
                            {(src, loading) => (
                                <img className='book-cover' style={{opacity: loading ? 0.5 : 1 }} src={src} alt='Book cover'/>
                            )}
                        </ProgressiveImage>
                    </div>
                    <div className='book-details'>
                        <label className='book-author'>{book.authors ? book.authors.join(', ') : 'Unknown'}</label>
                        <label className='book-description'>{this.limitDescription(book)}</label>
                        <div className='book-rating'>
                            <div className='book-rating-stars'>
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
                            </div>
                            <div className='book-rating-info'>
                                <label>{this.getRatings(book)}</label>
                            </div>
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
                        value={options.filter( i => i.value === book.shelf )[0]}
                        onChange={this.handleMoveBook}
                        menuPosition='fixed'
                        menuShouldBlockScroll={true}
                        options={options}
                        isOptionDisabled={ option => option.value === 'none' } />
                </div>
            </article>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Book;