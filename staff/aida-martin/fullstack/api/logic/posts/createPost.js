const { readFile, writeFile } = require('fs')

module.exports = function createPost (userId, image, text, callback) {
  //validators

  readFile('../data/users.json', 'utf-8', function (error, json) {
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

    readFile('../data/posts.json', 'utf-8', function (error, json) {
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
          visibility: 'public'
        }
  
        posts.push(post)

        json = JSON.stringify(posts)

        writeFile('../data/posts.json', json, 'utf-8', error => {
          if (error) {
            callback(error)
    
            return
          }
    
          callback(null)
        })
    })
  })
}