import React from 'react'
import glam from 'glamorous'
import { Link } from 'react-router-dom'
import getOr from 'lodash/fp/getOr'
import map from 'lodash/fp/map'

import BookShelf from './BookShelf'
import Add from '../icons/Add'

const ListBooksTitle = glam.div({
  padding: '10px 0',
  background: '#2e7c31',
  textAlign: 'center',
  '& h1': {
    fontWeight: 400,
    margin: 0,
    color: 'white'
  }
})

const ListBooksContent = glam.div({
  padding: '0 0 80px',
  flex: 1
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
  justifyContent: 'center'
})

const shelfLabelMap = [
  { id: 'currentlyReading', label: 'Currently Reading' },
  { id: 'wantToRead', label: 'Want to Read' },
  { id: 'read', label: 'Read' }
]

const BookApp = ({ shelves, updateBookShelf }) => (
  <div className="list-books">
    <ListBooksTitle>
      <h1>My Reads</h1>
    </ListBooksTitle>
    <ListBooksContent>
      <div>
        {/* Since Objects are unordered, and I want to keep */}
        {map(
          ({ id, label }) => (
            <BookShelf
              title={label}
              books={getOr([], id, shelves)}
              updateBookShelf={updateBookShelf}
            />
          ),
          shelfLabelMap
        )}
      </div>
    </ListBooksContent>
    <OpenSearch to="/search">
      <Add css={{ width: 28, height: 28 }} />
    </OpenSearch>
  </div>
)

export default BookApp
