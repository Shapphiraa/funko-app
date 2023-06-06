const { validators: { validateId, validateCallback } } = require('com')

export default function buyPost (userId, postId, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateCallback(callback)

  readFile('./data/users.json', 'utf-8', (error, json) => {
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

    readFile('./data/posts.json', 'utf-8', (error, json) => {
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

      post.author = userId
      post.price = 0

      json = JSON.stringify(posts)

      writeFile('./data/posts.json', json, 'utf-8', error => {
        if (error) {
          callback(error)
  
          return
        }
  
        callback(null)
    })
  })
})
}
