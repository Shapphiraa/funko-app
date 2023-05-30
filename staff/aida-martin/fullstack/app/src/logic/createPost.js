import { validateId, validateUrl, validateText, validateCallback } from './helpers/validators'
import { loadPosts, savePosts, findUserById } from '../data'

/**
 * Creates a new post, creates an ID for it and saves it in database
 *
 * @param {string} userId The user's ID (Post author)
 * @param {string} image The post's image
 * @param {string} text The post's text
 */

export default function createPost (userId, image, text, callback) {
  validateId(userId, 'User ID')
  validateUrl(image, 'Image URL')
  validateText(text)
  validateCallback(callback)

  findUserById(userId, user => {
    if (!user) {
      callback(new Error('User not found 😥', { cause: 'userError' }))

      return
    }

    let id = 'post-1'

    loadPosts(posts => {
      const lastPost = posts[posts.length - 1]

      if (lastPost) {
        id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)
      }

      const post = {
        id,
        author: userId,
        image,
        text,
        date: new Date(),
        likes: [],
        visibility: 'public'
      }

      posts.push(post)

      savePosts(posts, () => callback(null))
    })
  })
}
