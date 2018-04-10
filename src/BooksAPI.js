import axios from 'axios'

const api = "https://reactnd-books-api.udacity.com"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
}

const ax = (url, opts = {}) => {
  const { method = 'GET', headers, body } = opts
  return axios({
    url: `${api}${url}`,
    method,
    headers,
    data: body,
  })
}

export const get = bookId => ax(`/books/${bookId}`, { headers })
.then(res => res.data.book)

export const getAll = () => ax('/books', { headers }).then(res => res.data.books)

export const update = (bookId, shelf) =>
  ax(`/books/${bookId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: { shelf },
  }).then(res => res.data)

export const search = query =>
  ax('/search', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: { query },
  }).then(({ data: { books } }) => {
    if (books.error) {
      return []
    }
    return books
  })