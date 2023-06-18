const {
  validators: { validateId, validateCallback },
} = require('com')
const { readFile, writeFile } = require('fs')

/**
 * Deletes a post and all its data, updates data in the database (users, posts)
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 */

module.exports = function deletePost(userId, postId, callback) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateCallback(callback)

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if (error) {
      callback(error)

      return
    }

    const users = JSON.parse(json)

    const user = users.find((user) => user.id === userId)

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

      const post = posts.find((post) => post.id === postId)

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

      const index = posts.findIndex((_post) => _post.id === post.id)

      posts.splice(index, 1)

      postsJson = JSON.stringify(posts, null, 4)

      users.forEach((user) =>
        user.saves?.splice(
          (user.saves.findIndex((save) => save === post.id), 1)
        )
      )

      usersJson = JSON.stringify(users, null, 4)

      writeFile(`${process.env.DB_PATH}/users.json`, usersJson, (error) => {
        if (error) {
          callback(error)

          return
        }

        writeFile(`${process.env.DB_PATH}/posts.json`, postsJson, (error) =>
          callback(error)
        )
      })
    })
  })
}
