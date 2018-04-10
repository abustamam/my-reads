import join from 'lodash/fp/join'
import map from 'lodash/fp/map'

export const sanitizeBooks = map(({ id, shelf, title, authors, imageLinks: { smallThumbnail = 'http://via.placeholder.com/128x170' } = {} }) => ({
  shelf,
  title,
  id,
  author: join(', ', authors),
  imageUrl: smallThumbnail,
}))