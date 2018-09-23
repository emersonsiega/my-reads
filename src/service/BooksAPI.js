import axios from "axios";

class BooksAPI {
  /**
   * Create an instance of axios with a default config to be used in all methods
   */
  static _service = axios.create({
    baseURL: "https://reactnd-books-api.udacity.com",
    timeout: 30000,
    headers: {
      'Accept': 'application/json',
      'Authorization': BooksAPI.getToken()
    }
  });

  /**
   * Generate a unique token for storing your bookshelf data on the backend server.
   */
  static getToken() {
    let token = localStorage.token
    if (!token)
      token = localStorage.token = Math.random().toString(36).substr(-8)

    return token;
  }

  static get (bookId, callback, errCallback) {
    this._service.get( `/books/${bookId}` )
      .then(response => callback(response.data.book))
      .catch(response => errCallback(response))
  }

  static getAll( callback, errCallback ) {
    this._service.get( '/books' )
      .then(response => callback(response.data.books))
      .catch(response => errCallback(response))
  }

  static update(book, shelf, callback, errCallback) {
    this._service.put( `/books/${book.id}`, JSON.stringify({ shelf }), 
    {headers: {
        ...this._service.headers,
        'Content-Type': 'application/json'
      }
    })
    .then( response => callback(response.data) )
    .catch( response => errCallback(response) )
  }

  static search(query, callback, errCallback) {
    this._service.post( '/search', JSON.stringify({ query }), 
    {headers: {
        ...this._service.headers,
        'Content-Type': 'application/json'
      }
    })
    .then( response => callback(response.data.books) )
    .catch( response => errCallback(response) )
  }

}

export default BooksAPI