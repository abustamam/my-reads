import React, { Component } from 'react'
import glam, { Div, Input } from 'glamorous'
import { Link } from 'react-router-dom'
import debounce from 'lodash/fp/debounce'
import map from 'lodash/fp/map'
import find from 'lodash/fp/find'
import merge from 'lodash/fp/merge'

import { sanitizeBooks } from '../util'
import * as BooksAPI from './../BooksAPI'
import ArrowBack from '../icons/ArrowBack'
import BooksGrid from './BooksGrid'
import BookView from './BookView'

const CloseSearch = glam(Link)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 20,
  left: 15,
  width: 50,
  height: 50,
  background: 'white'
})

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = { query: '', results: [] }
    this.debouncedSendQuery = debounce(500, this.sendQuery)
  }

  updateQuery = e => {
    this.setState({ query: e.target.value })
    this.debouncedSendQuery()
  }

  sendQuery = () => {
    const { query } = this.state
    const { books } = this.props
    BooksAPI.search(query)
      .then(sanitizeBooks)
      .then(results =>
        this.setState({
          results: map(book => {
            const bookInBooks = find(b => b.id === book.id, books)
            if (bookInBooks) {
              return merge(book, bookInBooks)
            }
            return book
          }, results)
        })
      )
  }

  render() {
    const { query, results } = this.state
    const { updateBookShelf } = this.props
    return (
      <div>
        <Div
          css={{
            position: 'fixed',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: 5,
            display: 'flex',
            boxShadow:
              '0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23)'
          }}
        >
          <CloseSearch to="/">
            <ArrowBack css={{ width: 28, height: 28, fill: 'black' }} />
          </CloseSearch>
          <Div css={{ flex: 1, background: '#e9e' }}>
            <Input
              onChange={this.updateQuery}
              value={query}
              css={{
                width: '100%',
                padding: '15px 10px',
                fontSize: '1.25em',
                border: 'none',
                outline: 'none'
              }}
              type="text"
              placeholder="Search by title or author"
            />
          </Div>
        </Div>
        <Div css={{ padding: '80px 10px 20px' }}>
          <BooksGrid>
            {results.length === 0 ? (
              <Div>No search results found</Div>
            ) : (
              map(
                props => (
                  <BookView
                    key={props.title}
                    {...props}
                    updateBookShelf={updateBookShelf}
                  />
                ),
                results
              )
            )}
          </BooksGrid>
        </Div>
      </div>
    )
  }
}

export default Search
