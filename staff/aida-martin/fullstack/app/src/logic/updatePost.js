import { validators } from 'com'
import { savePost, findUserById, findPostById } from '../data'

const { validateId, validateUrl, validateText, validateCallback } = validators

/**
 * Updates post's data in database
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 * @param {string} image The post's image
 * @param {string} text The post's text
 */

export default function updatePost (userId, postId, image, text, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateUrl(image, 'Image URL')
  validateText(text, 'Text')
  validateCallback(callback)

  findUserById(userId, user => {
    if (!user) {
      callback(new Error('User not found 😥', { cause: 'userError' }))

      return
    }

    findPostById(postId, post => {
      if (!post) {
        callback(new Error('User not found 😥', { cause: 'userError' }))

        return
      }

      if (post.author !== userId) {
        callback(new Error('Post not found 😥', { cause: 'userError' }))

        return
      }
      post.image = image
      post.text = text

      savePost(post, () => callback(null))
    })
  })
}
