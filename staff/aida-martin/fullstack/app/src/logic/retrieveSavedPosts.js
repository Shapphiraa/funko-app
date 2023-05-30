import { validateId, validateCallback } from './helpers/validators'
import { loadPosts, loadUsers, findUserById } from '../data'

/**
 * Retrieves user's saved posts of the user from the database
 *
 * @param {string} userId The user's ID
 * @param {boolean} mySavedPosts If it refers to the saved posts or not
 *
 * @returns {string array} Array of user's saved posts
 */

export default function retrieveSavedPosts (userId, callback) {
  validateId(userId, 'User ID')
  validateCallback(callback)

  findUserById(userId, user => {
    if (!user) {
      callback(new Error('User ID not found 😥'))

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
        })

        callback(null, posts.filter((post) => user.saves?.includes(post.id)).toReversed()) // TODO toSorted (para que se ordenen por fecha)
      })
    })
  })
}
