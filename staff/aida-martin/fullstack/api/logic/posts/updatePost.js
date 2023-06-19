const {
  validators: { validateId, validateCallback, validateUrl, validateText },
} = require('com')
const { readFile, writeFile } = require('fs')

module.exports = function updatePost(userId, postId, image, text, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateUrl(image, 'Image URL')
  validateText(text, 'Text')
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

      if (post.author !== userId) {
        callback(
          new Error(
            `Post with ID ${post.id} does not belong to user with ID ${user.id} 😥`,
            { cause: 'userError' }
          )
        )

        return
      }

      post.image = image
      post.text = text

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
