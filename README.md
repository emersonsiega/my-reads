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
You can see a live demo [here](https://emersonsiega.github.io/my-reads/)

**Searching**

![Searching](https://media.giphy.com/media/2fSegR5QbFAnvz4UMX/giphy.gif)

**Moving**

![Moving](https://media.giphy.com/media/ckOcNqp2sgubiJ974f/giphy.gif)

**Removing**

![Removing](https://media.giphy.com/media/1xoqhOTG3zOBKB08Q2/giphy.gif)


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

**External packages**

This project also use some external packages:
*  [axios](https://www.npmjs.com/package/axios)
*  [react-router-dom](https://www.npmjs.com/package/react-router-dom)
*  [react-select](https://www.npmjs.com/package/react-select)
*  [react-progressive-image](https://www.npmjs.com/package/react-progressive-image)
*  [react-star-rating-component](https://www.npmjs.com/package/react-star-rating-component)
*  [react-debounce-input](https://www.npmjs.com/package/react-debounce-input)
*  [react-toastify](https://www.npmjs.com/package/react-toastify)

And for unit tests:
*  [jest](https://www.npmjs.com/package/jest)
*  [enzyme](https://www.npmjs.com/package/enzyme)


**Test coverage**

To see the unit tests coverage report, you can simply run `npm test -- --coverage`.

It will create a report in */my-reads/coverage/lcov-report/index.html*, it will looks like this:

![Code coverage](https://i.imgur.com/ITGL7iw.png)

## Authors

[Emerson Siega](https://www.linkedin.com/in/emersonsiega/)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/emersonsiega/my-reads/blob/master/LICENSE) file for details
