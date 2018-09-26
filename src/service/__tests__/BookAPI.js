import mockAxios from "axios";
import BooksAPI from "../BooksAPI";

describe('BooksAPI', () => {

    it('calls getAll and return three books', async () => {
        const books = await BooksAPI.getAll();

        expect(books).toBeDefined()
        expect(books.length).toBe(3)

        expect(books[0].shelf).toBe('read')
        expect(books[1].shelf).toBe('currentlyReading')
        expect(books[2].shelf).toBe('wantToRead')

        expect(mockAxios.get).toHaveBeenCalledTimes(1)
    })

    it('calls getAll and expect it fails', async () => {
        mockAxios.get.mockImplementationOnce(() =>
            Promise.reject({
                error: "FAILED!"
            })
        )

        const books = await BooksAPI.getAll();

        expect(books).toBeUndefined()
        expect(mockAxios.get).toHaveBeenCalledTimes(2)
    })

    it('calls update and change book from shelf', async () => {
        const book = {
            "title": "The Linux Command Line",
            "subtitle": "A Complete Introduction",
            "authors": [
                "William E. Shotts, Jr."
            ],
            "publisher": "No Starch Press",
            "publishedDate": "2012",
            "id": "nggnmAEACAAJ",
            "shelf": "currentlyReading"
        }

        mockAxios.put.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    books: [{ ...book, shelf: 'read' }]
                }
            })
        )

        const books = await BooksAPI.update(book, 'read')

        expect(books).toBeDefined()
        expect(books.length).toBe(1)
        expect(books[0].shelf).toEqual('read')

        expect(mockAxios.put).toHaveBeenCalledTimes(1)
    })

    it('calls update and expect it fails', async () => {
        const book = {
            "title": "The Linux Command Line",
            "subtitle": "A Complete Introduction",
            "authors": [
                "William E. Shotts, Jr."
            ],
            "publisher": "No Starch Press",
            "publishedDate": "2012",
            "id": "nggnmAEACAAJ",
            "shelf": "currentlyReading"
        }

        mockAxios.put.mockImplementationOnce(() =>
            Promise.reject({
                error: "FAILED"
            })
        )

        const books = await BooksAPI.update(book, 'read')

        expect(books).toBeUndefined()
        expect(mockAxios.put).toHaveBeenCalledTimes(2)
    })

    it('calls search and find two books', async () => {
        const books = await BooksAPI.search('the')

        expect(books).toBeDefined()
        expect(books.length).toBe(2)

        expect(books[0].title).toEqual("The Linux Command Line")
        expect(books[1].title).toEqual("The Cuckoo's Calling")

        expect(mockAxios.post).toHaveBeenCalledTimes(1)
    })

    it('calls search and find one book', async () => {
        const books = await BooksAPI.search('Learning')

        expect(books).toBeDefined()
        expect(books.length).toBe(1)

        expect(books[0].title).toEqual("Learning Web Development with React and Bootstrap")

        expect(mockAxios.post).toHaveBeenCalledTimes(2)
    })

    it('calls search and expect it fails', async () => {
        mockAxios.post.mockImplementationOnce(() =>
            Promise.reject({
                error: "FAILED"
            })
        )

        const books = await BooksAPI.search('Learning')

        expect(books).toBeUndefined()
        expect(mockAxios.post).toHaveBeenCalledTimes(3)
    })

    it('calls get and receive one book', async () => {
        const book = await BooksAPI.get(1);

        expect(book).toBeDefined()
        expect(book.id).toBe("nggnmAEACAAJ")
        expect(book.shelf).toBe('read')

        expect(mockAxios.get).toHaveBeenCalledTimes(3)
    })

    it('calls get and expect it fails', async () => {
        mockAxios.get.mockImplementationOnce(() =>
            Promise.reject({
                error: "FAILED"
            })
        )

        const book = await BooksAPI.get(1);

        expect(book).toBeUndefined()
        expect(mockAxios.get).toHaveBeenCalledTimes(4)
    })

})
