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
        mockAxios.get = jest.fn().mockImplementationOnce( () =>
            Promise.reject({
                error: "FAILED!"
            })
        )

        const books = await BooksAPI.getAll();

        expect(books).toBeUndefined()
        expect(mockAxios.get).toHaveBeenCalledTimes(1)

        
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

        mockAxios.put = jest.fn(() =>
            Promise.resolve({
                data: {
                    currentlyReading: [],
                    wantToRead: [],
                    read: ["nggnmAEACAAJ"]
                }
            }) 
        )

        const data = await BooksAPI.update(book, 'read')

        expect(data).toBeDefined()
        expect(data.read).toHaveLength(1)

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

        mockAxios.put = jest.fn(() =>
            Promise.reject({
                error: "FAILED"
            })
        )

        const books = await BooksAPI.update(book, 'read')

        expect(books).toBeUndefined()
        expect(mockAxios.put).toHaveBeenCalledTimes(1)
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
        mockAxios.post = jest.fn(() =>
            Promise.reject({
                error: "FAILED"
            })
        )

        const books = await BooksAPI.search('Learning')

        expect(books).toBeUndefined()
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
    })

    it('calls get and receive one book', async () => { 
        mockAxios.get = jest.fn().mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    book: {
                        "title": "The Linux Command Line",
                        "subtitle": "A Complete Introduction",
                        "authors": [
                            "William E. Shotts, Jr."
                        ],
                        "publisher": "No Starch Press",
                        "publishedDate": "2012",
                        "description": "You've experienced the shiny, point-and-click surface of your Linux computer—now dive below and explore its depths with the power of the command line. The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell. Along the way you'll learn the timeless skills handed down by generations of gray-bearded, mouse-shunning gurus: file navigation, environment configuration, command chaining, pattern matching with regular expressions, and more. In addition to that practical knowledge, author William Shotts reveals the philosophy behind these tools and the rich heritage that your desktop Linux machine has inherited from Unix supercomputers of yore. As you make your way through the book's short, easily-digestible chapters, you'll learn how to: * Create and delete files, directories, and symlinks * Administer your system, including networking, package installation, and process management * Use standard input and output, redirection, and pipelines * Edit files with Vi, the world’s most popular text editor * Write shell scripts to automate common or boring tasks * Slice and dice text files with cut, paste, grep, patch, and sed Once you overcome your initial \"shell shock,\" you'll find that the command line is a natural and expressive way to communicate with your computer. Just don't be surprised if your mouse starts to gather dust. A featured resource in the Linux Foundation's \"Evolution of a SysAdmin\"",
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
                    }
                }
            })
        )
        
        const book = await BooksAPI.get(1);

        expect(book).toBeDefined()
        expect(book.id).toBe("nggnmAEACAAJ")
        expect(book.shelf).toBe('read')

        expect(mockAxios.get).toHaveBeenCalledTimes(1)
    })

    it('calls get and expect it fails', async () => {
        mockAxios.get = jest.fn(() =>
            Promise.reject({
                error: "FAILED"
            })
        )

        const book = await BooksAPI.get(1);

        expect(book).toBeUndefined()
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
    })

    it('generate a new token in localStorage', () => {
        localStorage.setItem.mockClear();
        const token = BooksAPI.getToken()

        expect(token).toBeDefined()
        expect(token).toHaveLength(8)
        expect(localStorage.getItem('token')).toEqual(token)
    })

})
