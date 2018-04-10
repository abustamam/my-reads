import React, { Component } from 'react'
import glam from 'glamorous'
import includes from 'lodash/fp/includes'

import * as BooksAPI from './../BooksAPI'
import ArrowDropDown from '../icons/ArrowDropDown'

const BookListItem = glam.li({
  padding: '10px 15px',
  textAlign: 'left',
})

const Book = glam.div({
  width: 140,
})

const BookTop = glam.div({
  position: 'relative',
  height: 200,
  display: 'flex',
  alignItems: 'flex-end',
})

const BookDetail = glam.div({
  fontSize: '0.8em',
})

const BookTitle = glam(BookDetail)({
  marginTop: 10,
})

const BookAuthors = glam(BookDetail)({
  color: '#999',
})

const BookCover = glam.img({
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
})

const BookShelfChanger = glam.div({
  position: 'absolute',
  right: 0,
  bottom: -10,
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: '#60ac5d',
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const BookShelfSelector = glam.select({
  opacity: 0,
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
})

class BookView extends Component {
  handleSelectorChange = (bookId, shelf) => {
    const { updateBooks } = this.props
    BooksAPI.update(bookId, shelf).then(r => {
      BooksAPI.getAll().then(updateBooks)
    })
  }

  render() {
    const { imageUrl, title, author, shelf, id } = this.props
    return <BookListItem>
      <Book>
        <BookTop>
          <BookCover
            alt={`${title} by ${author} book cover`} src={imageUrl}
            width={128}
          />
          <BookShelfChanger>
            <ArrowDropDown css={{ height: 20, width: 20 }} />
            <BookShelfSelector
              onChange={e => this.handleSelectorChange(id, e.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading"
                      selected={shelf === 'currentlyReading'}>Currently Reading
              </option>
              <option value="wantToRead" selected={shelf === 'wantToRead'}>Want to Read
              </option>
              <option value="read" selected={shelf === 'read'}>Read</option>
              <option value="none"
                      selected={!includes(shelf, ['currentlyReading', 'wantToRead', 'read'])}>None
              </option>
            </BookShelfSelector>
          </BookShelfChanger>
        </BookTop>
        <BookTitle>{title}</BookTitle>
        <BookAuthors>{author}</BookAuthors>
      </Book>
    </BookListItem>
  }
}

export default BookView