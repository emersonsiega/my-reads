# MyReads Project

**MyReads: A Book Lending App** is the final assessment project for the Udacity's React Fundamentals course.

It's a simple App that lets you organize your books in three categories: Currently Reading, Want to Read and Read.

## Getting started

**Installing**
```
git clone https://github.com/emersonsiega/my-reads.git
cd my-reads
npm install
npm start
```

## Demo
The demo is hosted ~~temporarily~~ at [Heroku](https://my-reads-siega.herokuapp.com/)

## What You're Getting

After clone the repo, you will see many files. These are the main ones:
```
|-- package.json
`-- src
    |-- index.js
    |-- index.css
    |-- components
    |   `-- Book
    |      `-- Book.css
    |      `-- index.js
    |   `-- BookSearchBar
    |      `-- BookSearchBar.css
    |      `-- index.js
    |-- containers
    |   `-- Bookshelves
    |      `-- Bookshelves.css
    |      `-- index.js
    |   `-- Bookshelf
    |      `-- Bookshelf.css
    |      `-- index.js
    |   `-- Library
    |      `-- Library.css
    |      `-- index.js
    |-- service
    |   `-- BooksAPI.js
    |-- views
    |   `-- App.css
    |   `-- App.js
```


**Test coverage**

To see the unit tests coverage report, you can simply run `npm test -- --coverage`.

It will create a report in */my-reads/coverage/lcov-report/index.html*
