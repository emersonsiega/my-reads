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

  static get ( bookId ) {
    const request = this._service.get( `/books/${bookId}` )

    return request
      .then( response => response.data.book )
      .catch( err => err.response )
  }

  static getAll() {
    const request = this._service.get( '/books' )

    return request
      .then( response => response.data.books )
      .catch( err => err.response )
  }

  static update( book, shelf ) {
    const request = this._service.put( `/books/${book.id}`, JSON.stringify({ shelf }), 
    {
      headers: {
        ...this._service.headers,
        'Content-Type': 'application/json'
      }
    })

    return request
      .then( response => response.data )
      .catch(err => err.response )
  }

  static search( query ) {
    const request = this._service.post( '/search', JSON.stringify({ query }), 
    {
      headers: {
        ...this._service.headers,
        'Content-Type': 'application/json'
      }
    })

    return request
      .then( response => response.data.books )
      .catch( err => err.response )
  }

}

export default BooksAPI