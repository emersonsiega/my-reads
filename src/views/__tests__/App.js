import 'jsdom-global/register'
import React from 'react'
import { MemoryRouter, HashRouter } from "react-router-dom";
import mockAxios from "axios";

import App from "../App"

// TODO: how to create a setupFile for ezyme in an ejected project?
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('<App />', () => {
    it('shallow renders correctly', () => {
        expect(shallow(<App />))
    })

    it('render component correctly', () => {
        expect(mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        ))
    })

    it('renders a BookSearchBar component', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        expect(wrapper.find('BookSearchBar')).toBeDefined()
    })

    it('renders a Library component', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <App />
            </MemoryRouter>
        )

        expect(wrapper.find('Library')).toBeDefined()
    })

    it('renders a Bookshelves component', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        expect(wrapper.find('Bookshelves')).toBeDefined()
    })

    it('renders with three books', async () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        let app = wrapper.find('App').instance()

        await setTimeout(() => {
            expect(app.state).toBeDefined()
            expect(app.state.books).toHaveLength(3)
        }, 500)
    })
    
    it('render fails to get books', async () => {
        mockAxios.get = jest.fn().mockImplementationOnce(() =>
            Promise.reject({
                books: undefined 
            })
        )

        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )

        let app = wrapper.find('App').instance()

        await setTimeout(() => {
            expect(app.state).toBeDefined()
            expect(app.state.books).toHaveLength(0)
            expect(app.state.loading).toBeTruthy()
            expect(mockAxios.get).toHaveBeenCalledTimes(1)
        }, 500)
    })

    it('fails to search books', async () => {
        mockAxios.post = jest.fn().mockImplementationOnce(() =>
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

        let app = wrapper.find('App').instance()

        await setTimeout(() => {
            expect(app.state).toBeDefined()
            expect(app.state.search).toHaveLength(0)
        }, 500)
    })


    //TODO: Uncomment
    // it('searches one book', () => {
    //     const wrapper = mount(
    //         <MemoryRouter initialEntries={['/search']}>
    //             <App />
    //         </MemoryRouter>
    //     )

    //     wrapper.find('input').simulate('change', {target: {value: 'The Linux'}})

    //     let app = wrapper.find('App').instance()

    //     setTimeout( () => {
    //         expect(app.state).toBeDefined()
    //         expect(app.state.search).toHaveLength(1)
    //         expect(app.state.search[0].title).toBe('The Linux Command Line')
    //     }, 500)
    // })

    // it('moves book between shelves', async () => {
    //     mockAxios.put = jest.fn(() =>
    //         Promise.resolve({
    //             response: {
    //                 data: {
    //                     'currentlyReading': ["sJf1vQAACAAJ"],
    //                     'wantToRead': ["nggnmAEACAAJ", "evuwdDLfAyYC"],
    //                     'read': []
    //                 }
    //             }
    //         })
    //     )
        
    //     const wrapper = mount(
    //         <MemoryRouter initialEntries={['/']}>
    //             <App />
    //         </MemoryRouter>
    //     ) 

    //     let app = wrapper.find('App').instance()
    //     await setTimeout( async () => {
    //         const book = {...app.state.books[0], shelf: 'wantToRead'}

    //         app.onMoveBook(book)
            
    //         await setTimeout(() => {
    //             wrapper.update()
    //             app = wrapper.find('App').instance()
    //             expect(app.state).toBeDefined()
    //             expect(app.state.books).toHaveLength(3)
    //             expect(app.state.books[0].shelf).toEqual('wantToRead')
    //         }, 500)

    //     }, 500);

    // })

    // it('fails to move book between shelves', async () => {
    //     mockAxios.put.mockImplementationOnce(() =>
    //         Promise.reject({
    //             response: {}
    //         })
    //     )

    //     const wrapper = mount(
    //         <MemoryRouter initialEntries={['/']}>
    //             <App />
    //         </MemoryRouter>
    //     )

    //     let app = wrapper.find('App').instance()

    //     const mock = jest.fn()
    //     app.showMessage = mock

    //     await setTimeout( async () => {
    //         const book = {...app.state.books[0], shelf: 'wantToRead'}

    //         app.onMoveBook(book)

    //         await setTimeout(() => {
    //             wrapper.update()
    //             app = wrapper.find('App').instance()
    //             expect(app.state).toBeDefined()
    //             expect(app.state.books).toHaveLength(3)
    //             expect(app.state.books[0].shelf).toEqual('read')
    //             expect(mock).toHaveBeenCalledTimes(1)
    //         }, 500)

    //     }, 500);

    // })

})