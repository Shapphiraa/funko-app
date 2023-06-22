const {
  validators: { validateId, validateCallback },
} = require('com')
const { readFile, writeFile } = require('fs')

/**
 * Adds or removes post's likes. Update post in database
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 */

module.exports = function toggleLikePost(userId, postId, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateCallback(callback)

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if (error) {
      callback(error)

      return
    }

    const users = JSON.parse(json)

    let user = users.find((user) => user.id === userId)

    if (!user) {
      callback(new Error('User not found! 😥'))

      return
    }

    readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
      if (error) {
        callback(error)

        return
      }

      const posts = JSON.parse(json)

      let post = posts.find((post) => post.id === postId)

      if (!post) {
        callback(new Error('Post not found! 😥'))

        return
      }

      const index = post.likes.indexOf(userId)

      if (index < 0) {
        post.likes.push(userId)
      } else {
        post.likes.splice(index, 1)
      }

      json = JSON.stringify(posts, null, 4)

      writeFile(`${process.env.DB_PATH}/posts.json`, json, (error) => {
        if (error) {
          callback(error)

          return
        }

        callback(null)
      })
    })
  })
}
