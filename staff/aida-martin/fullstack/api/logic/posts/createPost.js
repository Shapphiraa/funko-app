const {
  validators: { validateId, validateText, validateUrl, validateCallback },
} = require('com')
const { readFile, writeFile } = require('fs')

module.exports = function createPost(userId, image, text, callback) {
  validateId(userId, 'User ID')
  validateUrl(image, 'Image URL')
  validateText(text)
  validateCallback(callback)

  readFile(`${process.env.DB_PATH}/users.json`, function (error, json) {
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

    readFile(`${process.env.DB_PATH}/posts.json`, function (error, json) {
      if (error) {
        callback(error)

        return
      }

      const posts = JSON.parse(json)

      let id = 'post-1'

      const lastPost = posts[posts.length - 1]

      if (lastPost) {
        id = `post-${parseInt(lastPost.id.slice(5)) + 1}`
      }

      const post = {
        id,
        author: userId,
        image,
        text,
        date: new Date(),
        likes: [],
        visibility: 'public',
        price: 0,
      }

      posts.push(post)

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
