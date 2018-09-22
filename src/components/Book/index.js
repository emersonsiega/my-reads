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
        options: [],
        coverPlaceholder: '/img/image-placeholder.png'
    }

    handleMoveBook (selected, {action}) {
        let book = this.props.book;

        book.shelf = action === 'clear' ? 'none' : selected.value;

        this.props.onMoveBook( book );
    }

    getRatings = (ratingsCount, id) => {
        let message = 'No ratings.'
        message = `${ratingsCount} ${ratingsCount > 0 && ratingsCount === 1 ? 'rating.' : 'ratings.'}`

        const link = `https://books.google.com.br/books?op=lookup&id=${id}`;
        return (
            <div>
                {message}
                <a style={{paddingLeft: '2px'}} className='book-link' target='_blank' href={link}>
                    { ratingsCount === 0 ? `Be the first!` : `Write a review` }
                </a>
            </div>
        )
    }

    limitDescription = (description) => description.substring(0, 140).trim().concat('...');

    render() {
        const {options, coverPlaceholder} = this.props;
        const {
            id,
            title,
            subtitle,
            imageLinks = {thumbnail: coverPlaceholder},
            authors = ['Unknown'],
            description = 'No description provided',
            averageRating = 0,
            ratingsCount = 0,
            previewLink,
            shelf
        } = this.props.book;

        return (
            <article className='book-card'>
                <div className='book-header'>
                    <label className='book-title'>{title}</label>
                    <label className='book-subtitle'>{subtitle}</label>
                </div>
                <div className='book-content'>
                    <div className='book-cover-container'>
                        <ProgressiveImage src={imageLinks.thumbnail} placeholder={coverPlaceholder}>
                            {(src, loading) => (
                                <img className='book-cover' style={{opacity: loading ? 0.5 : 1 }} src={src} alt='Book cover'/>
                            )}
                        </ProgressiveImage>
                    </div>
                    <div className='book-details'>
                        <label className='book-author'>{authors.join(', ')}</label>
                        <label className='book-description'>{this.limitDescription(description)}</label>
                        <div className='book-rating'>
                            <div className='book-rating-stars'>
                                <StarRatingComponent
                                    name='rating'
                                    value={averageRating}
                                    starCount={5}
                                    editing={false}
                                    starColor="#ffb400"
                                    emptyStarColor="#848484"
                                    renderStarIcon={(index, value) => 
                                        <span style={{fontSize: 21}}>
                                            <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                                        </span>
                                    }
                                    renderStarIconHalf={() =>
                                        <span style={{fontSize: 21}}>
                                            <span style={{position: 'absolute'}}><i className="far fa-star" /></span>
                                            <span><i className="fas fa-star-half" />
                                            </span>
                                        </span>
                                    }
                                />
                            </div>
                            <div className='book-rating-info'>
                                <label>{this.getRatings(ratingsCount, id)}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='book-footer'>
                    <a className='book-link book-footer-content' target='_blank' href={previewLink}>
                        Preview book
                    </a>
                    <Select className='book-options book-footer-content'
                        isMulti={false}
                        isSearchable={false}
                        isClearable={true}
                        placeholder='Move to...'
                        value={options.filter( i => i.value === shelf )[0]}
                        onChange={this.handleMoveBook}
                        menuPosition='fixed'
                        menuShouldBlockScroll={true}
                        options={options}
                        isOptionDisabled={option => option.value === 'none'} />
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