const {
  validators: { validateId, validateCallback },
} = require('com')
const { readFile, writeFile } = require('fs')

module.exports = function buyPost(userId, postId, callback) {
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

      post.author = userId
      post.price = 0

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
