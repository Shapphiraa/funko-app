const {
  validators: { validateId, validateCallback },
} = require('com')
const { readFile } = require('fs')

module.exports = function retrievePost(userId, postId, callback) {
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

      callback(null, post)
    })
  })
}
