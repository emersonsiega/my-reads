import 'jsdom-global/register'
import React from 'react'

import Book from "../../Book"

// TODO: how to create a setupFile for ezyme in an ejected project?
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('<Book />', () => {
    const onMoveBook = jest.fn()

    const props = {
        onMoveBook: onMoveBook,
        book: {
            "title": "The Linux Command Line",
            "subtitle": "A Complete Introduction",
            "authors": [
                "William E. Shotts, Jr.",
                "John Doe"
            ],
            "publisher": "No Starch Press",
            "publishedDate": "2012",
            "description": "THIS IS A DESCRIPTION WITH MORE THAN 140 LETTERS! THIS IS A DESCRIPTION WITH MORE THAN 140 LETTERS! THIS IS A DESCRIPTION WITH MORE THAN 140 LETTERS!",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9781593273897"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "1593273894"
                }
            ],
            "readingModes": {
                "text": true,
                "image": false
            },
            "pageCount": 480,
            "printType": "BOOK",
            "categories": [
                "COMPUTERS"
            ],
            "averageRating": 4,
            "ratingsCount": 2,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "1.2.2.0.preview.2",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api",
            "infoLink": "https://play.google.com/store/books/details?id=nggnmAEACAAJ&source=gbs_api",
            "canonicalVolumeLink": "https://market.android.com/details?id=book-nggnmAEACAAJ",
            "id": "nggnmAEACAAJ",
            "shelf": "read"
        },
        options: [
            { value: 'currentlyReading', name: 'Currently reading' },
            { value: 'wantToRead', name: 'Want to read' },
            { value: 'read', name: 'Read' }
        ]
    }

    it('shallow renders correctly', () => {
        expect(shallow(<Book {...props} />))
    })

    it('renders a book with title', () => {
        const wrapper = shallow(<Book {...props}></Book>)

        expect(wrapper.find('.book-title').get(0).props.children).toEqual('The Linux Command Line')
    })

    it('renders a book with subtitle', () => {
        const wrapper = shallow(<Book {...props}></Book>)

        expect(wrapper.find('.book-subtitle').get(0).props.children).toEqual('A Complete Introduction')
    })

    it('renders a book with two authors', () => {
        const wrapper = shallow(<Book {...props}></Book>)

        const authors = wrapper.find('.book-author').get(0).props.children.props.children
        expect(authors).toBeDefined()
        expect(authors).toHaveLength(2)
        expect(authors[0].props.children[0]).toBe("William E. Shotts, Jr.")
        expect(authors[1].props.children[0]).toBe("John Doe")
    })

    it('renders a book with long description', () => {
        const wrapper = shallow(<Book {...props}></Book>)

        expect(wrapper.find('.book-description').get(0).props.children)
            .toEqual('THIS IS A DESCRIPTION WITH MORE THAN 140 LETTERS! THIS IS A DESCRIPTION WITH MORE THAN 140 LETTERS! THIS IS A DESCRIPTION WITH MORE THAN 140...')

    })

    it('render a book with a thumbnail image', () => {
        const wrapper = mount(<Book {...props}></Book>)

        expect(wrapper.find('ProgressiveImage').get(0).props.src)
            .toEqual("http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api")
    })

    it('renders a book with two star rating', () => {
        const wrapper = mount(<Book {...props}></Book>)

        expect(wrapper.find('.book-rating-info').contains(
            <label>
                <div>
                    2 ratings.
                    <a style={{ paddingLeft: '2px' }} className="book-link" target="_blank" href="https://books.google.com.br/books?op=lookup&id=nggnmAEACAAJ" alt="Write a review">
                        Write a review
                    </a>
                </div>
            </label>
        )).toBeTruthy()
    })

    it('renders a book with shelf name Read', () => {
        const wrapper = mount(<Book {...props}></Book>)

        expect(wrapper.find('Select').props().value.value).toEqual('read')
    })

    it('renders a book without authors name', () => {
        const ownProps = {
            ...props, 
            book: { ...props.book, authors: undefined }
        }

        const wrapper = shallow(<Book {...ownProps}></Book>)

        const authors = wrapper.find('.book-author').get(0).props.children.props.children
        expect(authors).toBeDefined()
        expect(authors).toHaveLength(1)
        expect(authors[0].props.children[0]).toBe("Unknown")
    })

    it('renders a book without description', () => {
        const ownProps = {
            ...props,
            book: { ...props.book, description: undefined }
        }

        const wrapper = shallow(<Book {...ownProps}></Book>)

        expect(wrapper.find('.book-description').get(0).props.children).toEqual('No description provided...')
    })

    it('renders a book without thumbnail image', () => {
        const ownProps = {
            ...props,
            book: { ...props.book, imageLinks: undefined }
        }

        const wrapper = mount(<Book {...ownProps}></Book>)

        expect(wrapper.find('ProgressiveImage').get(0).props.src).toEqual("/img/image-placeholder.png")
    })

    it('renders a book without ratings', () => {
        const ownProps = {
            ...props,
            book: {
                ...props.book, 
                averageRating: undefined,
                ratingsCount: undefined 
            }
        }

        const wrapper = mount(<Book {...ownProps}></Book>)

        expect(wrapper.find('.book-rating-info').contains(
            <label>
                <div>
                    No ratings.
                    <a style={{ paddingLeft: '2px' }} className="book-link" target="_blank" href="https://books.google.com.br/books?op=lookup&id=nggnmAEACAAJ" alt="Write a review">
                        Be the first!
                    </a>
                </div>
            </label>
        )).toBeTruthy()
    })

    it('renders a book without shelf', () => {
        const ownProps = {
            ...props,
            book: { ...props.book, shelf: undefined }
        }

        const wrapper = mount(<Book {...ownProps}></Book>)

        expect(wrapper.find('Select').props().value).toBeNull()
    })

    it('renders a book with half star rating', () => {
        const ownProps = {
            ...props,
            book: {
                ...props.book, 
                averageRating: 4.5,
                ratingsCount: 15 
            }
        }

        const wrapper = mount(<Book {...ownProps}></Book>)

        expect(wrapper.find('.book-rating-info').contains(
            <label>
                <div>
                    15 ratings.
                    <a style={{ paddingLeft: '2px' }} className="book-link" target="_blank" href="https://books.google.com.br/books?op=lookup&id=nggnmAEACAAJ" alt="Write a review">
                        Write a review
                    </a>
                </div>
            </label>
        )).toBeTruthy()
    })

    it('renders a book with one rating', () => {
        const ownProps = {
            ...props,
            book: {
                ...props.book, 
                averageRating: 3,
                ratingsCount: 1 
            }
        }

        const wrapper = mount(<Book {...ownProps}></Book>)

        expect(wrapper.find('.book-rating-info').contains(
            <label>
                <div>
                    1 rating.
                    <a style={{ paddingLeft: '2px' }} className="book-link" target="_blank" href="https://books.google.com.br/books?op=lookup&id=nggnmAEACAAJ" alt="Write a review">
                        Write a review
                    </a>
                </div>
            </label>
        )).toBeTruthy()
    })

    it('renders a book and move to another shelf', () => {
        const ownProps = {
            ...props,
            book: { ...props.book, shelf: 'none' }
        }

        const wrapper = shallow(<Book {...ownProps} />)        
        const func = wrapper.find('StateManager').props().onChange

        // Unfortunately, it's the only way to test the 'onChange' of react-select
        func({ value: 'read' }, { action:'select-option'})
        expect(onMoveBook).toHaveBeenCalledTimes(1)
    })

    it('renders a book and remove from shelf', () => {
        const ownProps = {
            ...props,
            book: { ...props.book, shelf: 'read' }
        }

        const wrapper = shallow(<Book {...ownProps} />)
        const func = wrapper.find('StateManager').props().onChange

        // Unfortunately, it's the only way to test the 'onChange' of react-select
        func({}, { action: 'clear' });
        expect(onMoveBook).toHaveBeenCalledTimes(2)
    })

} )