import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import glam from 'glamorous'
import { Switch, Route } from 'react-router-dom'
import flow from 'lodash/fp/flow'
import groupBy from 'lodash/fp/groupBy'
import filter from 'lodash/fp/filter'
import concat from 'lodash/fp/concat'
import __ from 'lodash/fp/__'

import BookApp from './components/BookApp'
import Search from './components/Search'
import './App.css'
import { sanitizeBooks } from './util'

const AppRoot = glam.div({
  background: 'white'
})

class App extends Component {
  state = { books: [] }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then(this.updateBooks)
      .catch(err => console.log(err))
  }

  updateBooks = bookList => {
    this.setState({
      books: sanitizeBooks(bookList)
    })
  }

  updateBookShelf = (book, shelf) => {
    const bookId = book.id
    BooksAPI.update(bookId, shelf).then(() => {
      book.shelf = shelf
      const newBooks = flow(
        // book list without book being updated
        filter(book => bookId !== book.id),
        // concat (i.e., "push") the new updated book to the book array
        concat(__, [book])
      )(this.state.books)
      this.setState({ books: newBooks })
    })
  }

  render() {
    const { books } = this.state
    const shelves = groupBy('shelf', books)
    return (
      <AppRoot>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <BookApp
                {...props}
                shelves={shelves}
                updateBookShelf={this.updateBookShelf}
              />
            )}
          />
          <Route
            path="/search"
            render={props => (
              <Search
                {...props}
                books={books}
                updateBookShelf={this.updateBookShelf}
              />
            )}
          />
        </Switch>
      </AppRoot>
    )
  }
}

export default App
