import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import glam from 'glamorous'
import { Switch, Route } from 'react-router-dom'
import groupBy from 'lodash/fp/groupBy'

import BookApp from './components/BookApp'
import Search from './components/Search'
import './App.css'
import { sanitizeBooks } from './util'

const AppRoot = glam.div({
  background: 'white',
})

class App extends Component {
  state = { books: [] }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(this.updateBooks).catch(err => console.log(err))
  }

  updateBooks = (bookList) => {
    this.setState({
      books: sanitizeBooks(bookList),
    })
  }

  render() {
    const { books } = this.state
    const shelves = groupBy('shelf', books)
    return (
      <AppRoot>
        <Switch>
          <Route
            exact path="/"
            render={props => <BookApp
              {...props} shelves={shelves}
              updateBooks={this.updateBooks}
            />}
          />
          <Route
            path="/search"
            render={props => (
              <Search {...props} books={books} updateBooks={this.updateBooks} />)}
          />
        </Switch>
      </AppRoot>
    )
  }
}

export default App