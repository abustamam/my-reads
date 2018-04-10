import React from 'react'
import glam, { Div } from 'glamorous'
import map from 'lodash/fp/map'

import BooksGrid from './BooksGrid'
import BookView from './BookView'

const BookShelfBase = glam.div({
  padding: '0 10px 20px',
  '@media (min-width: 600px)': {
    padding: '0 20px 40px'
  }
})

const BookShelfTitle = glam.h2({
  borderBottom: '1px solid #dedede'
})

const BookShelf = ({ title, books, updateBooks, updateBookShelf }) => (
  <BookShelfBase>
    <BookShelfTitle>{title}</BookShelfTitle>
    <Div css={{ textAlign: 'center' }}>
      <BooksGrid>
        {map(
          props => (
            <BookView
              key={props.title}
              updateBooks={updateBooks}
              updateBookShelf={updateBookShelf}
              {...props}
            />
          ),
          books
        )}
      </BooksGrid>
    </Div>
  </BookShelfBase>
)

export default BookShelf
