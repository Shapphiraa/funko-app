import { validators } from 'com'
import { findUserById, findPostById, savePost } from '../data'

const { validateId, validateCallback } = validators

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