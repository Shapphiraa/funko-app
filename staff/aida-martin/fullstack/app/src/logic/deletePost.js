import { validators } from 'com'
import { loadPosts, loadUsers, savePosts, saveUsers, findUserById, findPostById } from '../data'

const { validateId, validateCallback } = validators

/**
 * Deletes a post and all its data, updates data in the database (users, posts)
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 */

export default function deletePost (userId, postId, callback) {
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

      if (post.author !== userId) {
        callback(new Error(`Post with ID ${post.id} does not belong to user with ID ${user.id} 😥`, { cause: 'userError' }))

        return
      }

      loadPosts(posts => {
        const index = posts.findIndex((_post) => _post.id === post.id)

        posts.splice(index, 1)

        savePosts(posts, () => callback(null))
      })

      loadUsers(users => {
        users.forEach((user) => user.saves?.splice((user.saves.findIndex((save) => save === post.id), 1)))

        saveUsers(users, () => callback(null))
      })
    })
  })
}