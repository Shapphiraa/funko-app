const {
  validators: { validateId, validateCallback },
} = require('com')
const { readFile, writeFile } = require('fs')

/**
 * Adds or removes post's saves. Update user in database
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 */

module.exports = function toggleSavePost(userId, postId, callback) {
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

      const index = user.saves.indexOf(postId)

      if (index < 0) {
        user.saves.push(postId)
      } else {
        user.saves.splice(index, 1)
      }

      json = JSON.stringify(users, null, 4)

      writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
        if (error) {
          callback(error)

          return
        }

        callback(null)
      })
    })
  })
}
