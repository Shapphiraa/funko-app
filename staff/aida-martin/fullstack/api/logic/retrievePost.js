const { readFile } = require('fs')

module.exports = function retrievePost (userId, postId, callback) {
  //validators

  readFile('../data/users.json', 'utf-8', (error, json) => {
    if (error) {
      callback(error)

      return
    }

    const users = JSON.parse(json)

    let user = users.find(user => user.id === userId)

    if (!user) {
      callback(new Error('User not found! 😥'))

      return
    }

    readFile('../data/posts.json', 'utf-8', (error, json) => {
      if (error) {
        callback(error)

        return
      }

      const posts = JSON.parse(json)

      let post = posts.find(post => post.id === postId)

      if (!post) {
        callback(new Error('Post not found! 😥'))

        return
      }

      callback(null, post)
    })
  })
}