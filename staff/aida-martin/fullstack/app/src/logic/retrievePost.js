import { validators } from 'com'
import { findUserById, findPostById } from '../data'

const { validateId, validateCallback } = validators

/**
 * Retrieves a post from the database
 *
 * @param {string} userId The user's ID
 *
 * @returns {object} A post
 */

export default function retrievePost (userId, postId, callback) {
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

      callback(null, post)
    })
  })
}
