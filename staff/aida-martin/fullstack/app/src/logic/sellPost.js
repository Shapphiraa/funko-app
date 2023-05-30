import { validateId, validateCallback } from './helpers/validators'
import { findUserById, findPostById, savePost } from '../data'

export default function buyPost (userId, postId, price, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateCallback(callback)

  findUserById(userId, user => {
    if (!user) {
      callback(new Error('User not found 😥', { cause: 'userError' }))

      return
    }

    findPostById(postId, post => {
      if (!post) {
        callback(new Error('Post not found 😥', { cause: 'userError' }))

        return
      }

      post.price = price

      savePost(post, () => callback(null))
    })
  })
}
