import 'jsdom-global/register'
import React from 'react'

import BookSearchBar from "../../BookSearchBar"

// TODO: how to create a setupFile for ezyme in an ejected project?
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('<BookSearchBar />', () => {
    const onSearchBook = jest.fn()
    const props = {
        location: {
            pathname: '/search'
        },
        title: 'MyReads',
        onSearchBook: onSearchBook
    }

    it('shallow renders correctly', () => {
        expect(shallow(<BookSearchBar {...props}/>))
    })

    it('shows search input', () => {
        const wrapper = shallow(<BookSearchBar {...props} />)

        expect(wrapper.find('input')).toBeDefined()
    })

    it('shows search icon', () => {
        const ownProps = {
            ...props,
            location: { ...props.location, pathname: '/' }
        }
        const wrapper = shallow(<BookSearchBar {...ownProps} />)

        expect(wrapper.find('.search-icon')).toBeDefined()
    })

    it('search a book', () => {
        const wrapper = shallow(<BookSearchBar {...props} />)

        wrapper.find('.search-input').simulate('change', { target: {value: 'linux' } })

        expect(onSearchBook).toHaveBeenCalledTimes(1)
    })

    it('clear a search', () => {
        const wrapper = shallow(<BookSearchBar {...props} />)

        wrapper.find('.search-input').simulate('change', { target: { value: '' } })

        expect(onSearchBook).toHaveBeenCalledTimes(2)
    })

})