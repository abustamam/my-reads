import React, { Component } from 'react'
import glam from 'glamorous'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'
import Add from '../icons/Add'

const ListBooksTitle = glam.div({
  padding: '10px 0',
  background: '#2e7c31',
  textAlign: 'center',
  '& h1': {
    fontWeight: 400,
    margin: 0,
    color: 'white',
  },
})

const ListBooksContent = glam.div({
  padding: '0 0 80px',
  flex: 1,
})

const OpenSearch = glam(Link)({
  lineHeight: 0,
  position: 'fixed',
  right: 25,
  bottom: 25,
  borderRadius: '50%',
  width: 50,
  height: 50,
  background: '#2e7d32',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

class BookApp extends Component {
  render() {
    const {
      shelves: {
        currentlyReading = [],
        read = [],
        wantToRead = [],
      },
      updateBooks,
    } = this.props

    return (
      <div className="list-books">
        <ListBooksTitle>
          <h1>My Reads</h1>
        </ListBooksTitle>
        <ListBooksContent>
          <div>
            <BookShelf
              title="Currently Reading"
              books={currentlyReading}
              updateBooks={updateBooks}
            />
            <BookShelf
              title="Want To Read"
              books={wantToRead}
              updateBooks={updateBooks}
            />
            <BookShelf
              title="Read"
              books={read}
              updateBooks={updateBooks}
            />
          </div>
        </ListBooksContent>
        <OpenSearch to="/search">
          <Add css={{ width: 28, height: 28 }} />
        </OpenSearch>
      </div>
    )
  }
}

export default BookApp