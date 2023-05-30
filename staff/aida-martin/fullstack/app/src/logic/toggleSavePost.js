import { validateId, validateCallback } from './helpers/validators'
import { saveUser, findPostById, findUserById } from '../data'

/**
 * Adds or removes post's saves. Update user in database
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 */

export default function toggleSavePost (userId, postId, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateCallback(callback)

  findUserById(userId, user => {
    if (!user) {
      callback(new Error('User not found 😥'))

      return
    }

    findPostById(postId, post => {
      if (!post) {
        callback(new Error('Post not found 😥'))

        return
      }

      const index = user.saves.indexOf(postId)

      if (index < 0) {
        user.saves.push(postId)
      } else {
        user.saves.splice(index, 1)
      }

      saveUser(user, () => callback(null))
    })
  })
}
