import { validateId, validateCallback } from './helpers/validators'
import { findUserById, loadPosts, loadUsers } from '../data'

/**
 * Retrieves all posts from the database
 *
 * @param {string} userId The user's ID
 *
 * @returns {object array} All posts sorted by creation
 */

export default function retrievePosts (userId, callback) {
  validateId(userId, 'User ID')
  validateCallback(callback)

  findUserById(userId, user => {
    if (!user) {
      callback(new Error(`User with ID ${userId} not found`))

      return
    }

    loadPosts(posts => {
      loadUsers(users => {
        posts = posts.filter(post => post.visibility === 'public' || user.id === post.author)

        posts.forEach(post => {
          post.saves = user.saves.includes(post.id)

          const _user = users.find(user => user.id === post.author)

          post.author = {
            id: _user.id,
            name: _user.name.split(' ')[0],
            avatar: _user.avatar
          }

          callback(null, posts.toReversed()) // TODO toSorted (para que se ordenen por fecha)
        })
      })
    })
  })
}
