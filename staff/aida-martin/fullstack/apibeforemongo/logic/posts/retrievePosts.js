const {
  validators: { validateId, validateCallback },
} = require('com')
const { readFile } = require('fs')

module.exports = function retrievePosts(userId, callback) {
  validateId(userId, 'User ID')
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

      let posts = JSON.parse(json)

      posts = posts.filter(
        (post) => post.visibility === 'public' || user.id === post.author
      )

      posts.forEach((post) => {
        post.saves = user.saves.includes(post.id)

        const _user = users.find((user) => user.id === post.author)

        post.author = {
          id: _user.id,
          name: _user.name.split(' ')[0],
          avatar: _user.avatar,
        }

        // post.date = new Date(post.date).toLocaleString('en-GB')
      })
      //toReversed no funciona en esta versión de Node
      callback(null, posts.reverse())
    })
  })
}
