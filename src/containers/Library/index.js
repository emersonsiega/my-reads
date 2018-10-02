import React from 'react';
import PropTypes from "prop-types";

import './Library.css'
import Book from "../../components/Book";

const Library = ({books, onMoveBook, searchTerms, options}) => {        
    return (
        <div className='library-body'>
            { books.length === 0 ?
                <div>
                    <label className='empty-message'>
                        Type something to search a book!
                    </label>

                    <div className='search-suggestions'>
                        <h2 className='search-suggestion-title'>Suggestions</h2>
                        {searchTerms.map(term =>
                            <label key={term} className='search-term'>{term}</label>
                        )}
                    </div>
                </div>
                :
                <div className='library-list'>
                    {books.map( book => (
                        <Book key={book.id} book={book} onMoveBook={onMoveBook} 
                            options={options}/>
                    ))}
                </div>
            }
        </div>
    )
}

Library.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMoveBook: PropTypes.func.isRequired
}

Library.defaultProps = {
    books: [],
    options: [
        { value: 'currentlyReading', label: 'Currently Reading' },
        { value: 'wantToRead', label: 'Want to read' },
        { value: 'read', label: 'Read' },
        { value: 'none', label: 'None' }
    ],
    searchTerms: [
        'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen',
        'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business',
        'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook',
        'Cricket', 'Cycling', 'Desai', 'Design', 'Development',
        'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education',
        'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness',
        'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo',
        'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn',
        'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery',
        'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry',
        'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics',
        'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh',
        'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate',
        'Virtual Reality', 'Web Development', 'iOS'
    ]
}

export default Library;