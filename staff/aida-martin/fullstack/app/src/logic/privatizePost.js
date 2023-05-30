import { validateId, validateCallback } from './helpers/validators'
import { findUserById, findPostById, savePost } from '../data'

export default function togglePrivatizePost (userId, postId, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateCallback(callback)

  findUserById(userId, user => {
    if (!user) {
      callback(new Error(`User with ID ${userId} not found`))

      return
    }

    findPostById(postId, post => {
      if (!post) {
        callback(new Error('Post not found 😥'))

        return
      }

      if (post.visibility === 'public') {
        post.visibility = 'private'
      } else {
        post.visibility = 'public'
      }

      savePost(post, () => callback(null))
    })
  })
}
