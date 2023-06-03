const { readFile } = require('fs')

module.exports = function retrievePosts (userId, callback) {
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

      let posts = JSON.parse(json)

      posts = posts.filter(post => post.visibility === 'public' || user.id === post.author)

        posts.forEach(post => {
          post.saves = user.saves.includes(post.id)

          const _user = users.find(user => user.id === post.author)

          post.author = {
            id: _user.id,
            name: _user.name.split(' ')[0],
            avatar: _user.avatar
          }


      })
      //toReversed no funciona en esta versión de Node
      callback(null, posts/*.toReversed()*/)
    })
  })
}