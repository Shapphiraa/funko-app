const { validators: { validateId, validateCallback } } = require('com')

export default function togglePrivatizePost (userId, postId, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateCallback(callback)

  readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
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

    readFile('./data/posts.json',  (error, json) => {
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

      if (post.visibility === 'public') {
        post.visibility = 'private'
      } else {
        post.visibility = 'public'
      }

      json = JSON.stringify(posts)

      writeFile('./data/posts.json', json,  error => {
        if (error) {
          callback(error)
  
          return
        }
  
        callback(null)
    })
  })
})
}
