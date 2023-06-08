const { validators: { validateId, validateCallback } } = require('com')

/**
 * Adds or removes post's saves. Update user in database
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 */

export default function toggleSavePost (userId, postId, callback) {
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

      const index = user.saves.indexOf(postId)

      if (index < 0) {
        user.saves.push(postId)
      } else {
        user.saves.splice(index, 1)
      }

      json = JSON.stringify(users)

      writeFile(`${process.env.DB_PATH}/users.json`, json,  error => {
        if (error) {
          callback(error)
  
          return
        }
  
        callback(null)
    })
  })
})
}
