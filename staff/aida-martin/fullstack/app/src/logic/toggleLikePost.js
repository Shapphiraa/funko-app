import { validateId, validateCallback } from './helpers/validators'
import { savePost, findPostById, findUserById } from '../data'

/**
 * Adds or removes post's likes. Update post in database
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 */

export default function toggleLikePost (userId, postId, callback) {
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

      const index = post.likes.indexOf(userId)

      if (index < 0) {
        post.likes.push(userId)
      } else {
        post.likes.splice(index, 1)
      }

      savePost(post, () => callback(null))
    })
  })
}
