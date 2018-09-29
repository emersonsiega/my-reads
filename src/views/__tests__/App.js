import 'jsdom-global/register'
import React from 'react'
import { MemoryRouter } from "react-router-dom";
import mockAxios from "axios";

import App from "../App"

// TODO: how to create a setupFile for ezyme in an ejected project?
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('<App />', () => {
    it('shallow renders correctly', (done) => {
        expect(shallow(<App />))
        done()
    })

    it('render component correctly', (done) => {
        expect(mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        ))
        done()
    })

    it('renders a BookSearchBar component', (done) => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        expect(wrapper.find('BookSearchBar')).toBeDefined()
        done()
    })

    it('renders a Library component', (done) => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <App />
            </MemoryRouter>
        )

        expect(wrapper.find('Library')).toBeDefined()
        done()
    })

    it('renders a Bookshelves component', (done) => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        expect(wrapper.find('Bookshelves')).toBeDefined()
        done()
    })

    it('renders with three books', (done) => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        let app = wrapper.find('App').instance()

        setTimeout(() => {
            expect(app.state).toBeDefined()
            expect(app.state.books).toHaveLength(3)
            done()
        }, 300)
    })
    
    it('render fails to get books', (done) => {
        mockAxios.get = jest.fn(mockAxios.get).mockImplementationOnce(() =>
            Promise.reject({
                books: undefined
            })
        )

        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        const app = wrapper.find('App').instance()

        process.nextTick(() => {
            expect(app.state).toBeDefined()
            expect(app.state.books).toHaveLength(0)
            expect(app.state.loading).toBeTruthy()
            expect(mockAxios.get).toHaveBeenCalledTimes(1)
            done()
        })
    })

    it('fails to search books', (done) => {
        mockAxios.post = jest.fn(mockAxios.post).mockImplementationOnce(() =>
            Promise.reject({
                response: undefined
            })
        )

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <App />
            </MemoryRouter>
        )
        
        wrapper.find('input').simulate('change', { target: { value: 'linux' } })
        
        const app = wrapper.find('App').instance()

        setTimeout(() => {
            expect(app.state).toBeDefined()
            expect(app.state.search).toHaveLength(0)
            done()
        }, 300)
    })

    it('error to search books', (done) => {
        mockAxios.post = jest.fn(mockAxios.post).mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    books: {
                        error: `can't find books`
                    }
                }
            })
        )

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <App />
            </MemoryRouter>
        )

        wrapper.find('input').simulate('change', { target: { value: 'linux' } })

        const app = wrapper.find('App').instance()

        setTimeout(() => {
            expect(app.state).toBeDefined()
            expect(app.state.search).toHaveLength(0)
            done()
        }, 300)
    })

    it('searches one book', (done) => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <App />
            </MemoryRouter>
        )

        wrapper.find('input').simulate('change', {target: {value: 'The Linux'}})

        const app = wrapper.find('App').instance()

        setTimeout( () => {    
            expect(app.state).toBeDefined()
            expect(app.state.search).toHaveLength(1)
            expect(app.state.search[0].title).toBe('The Linux Command Line')
            done()
        }, 300)
    })

    it('moves book between shelves', (done) => {
        mockAxios.put = jest.fn(mockAxios.put).mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    'currentlyReading': ["sJf1vQAACAAJ"],
                    'wantToRead': ["nggnmAEACAAJ", "evuwdDLfAyYC"],
                    'read': []
                }
            })
        )

        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        ) 
        
        let app = wrapper.find('App').instance()

        setTimeout( () => {
            const book = app.state.books[0]
            book.shelf = 'wantToRead'

            app.onMoveBook(book)
            
            setTimeout(() => {
                expect(app.state).toBeDefined()
                expect(app.state.books).toHaveLength(3)
                expect(app.state.books[2].shelf).toEqual('wantToRead')
                done()
            }, 300)

        }, 400);

    })

    it('adds new book to shelf', (done) => {
        const book = {
            "title": "Learning React",
            "subtitle": "",
            "authors": [
                "Me"
            ],
            "publisher": "No Starch Press",
            "publishedDate": "2012",
            "description": "This is a new book!",
            "pageCount": 480,
            "printType": "BOOK",
            "averageRating": 4,
            "ratingsCount": 2,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "1.2.2.0.preview.2",
            "previewLink": "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api",
            "id": "xxxxxxx",
            "shelf": "currentlyReading"
        }

        mockAxios.put = jest.fn(mockAxios.put).mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    'currentlyReading': ["sJf1vQAACAAJ", "xxxxxxx"],
                    'wantToRead': ["nggnmAEACAAJ", "evuwdDLfAyYC"],
                    'read': []
                }
            })
        )

        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        let app = wrapper.find('App').instance()

        setTimeout(() => {
            app.onMoveBook(book)

            setTimeout(() => {
                expect(app.state).toBeDefined()
                expect(app.state.books).toHaveLength(4)
                expect(app.state.books[3].title).toEqual('Learning React')
                done()
            }, 300)
        }, 400)
    })

    it('removes book from shelf', (done) => {
        const book = {
            "title": "Learning React",
            "subtitle": "",
            "authors": [
                "Me"
            ],
            "publisher": "No Starch Press",
            "publishedDate": "2012",
            "description": "This is a new book!",
            "pageCount": 480,
            "printType": "BOOK",
            "averageRating": 4,
            "ratingsCount": 2,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "1.2.2.0.preview.2",
            "previewLink": "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api",
            "id": "xxxxxxx",
            "shelf": "currentlyReading"
        }

        mockAxios.put = jest.fn(mockAxios.put).mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    'currentlyReading': ["sJf1vQAACAAJ"],
                    'wantToRead': ["evuwdDLfAyYC"],
                    'read': []
                }
            })
        )
        mockAxios.get = jest.fn(mockAxios.get).mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    books: [book]
                }
            })
        )

        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        let app = wrapper.find('App').instance()

        setTimeout(() => {
            book.shelf = 'none'
            app.onMoveBook(book)

            setTimeout(() => {
                app = wrapper.find('App').instance()

                expect(app.state).toBeDefined()
                expect(app.state.books).toHaveLength(0)
                done()
            }, 300)
        }, 400)

    })

    it('fails to move book from shelf', (done) => {
        const book = {
            "title": "Learning React",
            "subtitle": "",
            "authors": [
                "Me"
            ],
            "publisher": "No Starch Press",
            "publishedDate": "2012",
            "description": "This is a new book!",
            "pageCount": 480,
            "printType": "BOOK",
            "averageRating": 4,
            "ratingsCount": 2,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "1.2.2.0.preview.2",
            "previewLink": "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api",
            "id": "xxxxxxx",
            "shelf": "currentlyReading"
        }

        mockAxios.put = jest.fn(mockAxios.put).mockImplementationOnce(() =>
            Promise.reject({
                response: undefined
            })
        )

        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        let app = wrapper.find('App').instance()

        setTimeout(() => {
            app.onMoveBook(book)

            setTimeout(() => {
                expect(app.state).toBeDefined()
                expect(app.state.books).toBeDefined()
                done()
            }, 300)
        }, 400)
    })

})