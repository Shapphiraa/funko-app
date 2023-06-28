const {
  validators: { validateId },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function deletePost(userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  const { users, posts } = context

  return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
    if (!user) throw new Error('User not found! 😥')

    return posts.findOne({ _id: new ObjectId(postId) }).then((post) => {
      if (!post) throw new Error('Post not found! 😥')

      if (post.author.toString() !== userId) {
        throw new Error(
          `Post with ID ${post._id.toString()} does not belong to user with ID ${userId} 😥`
        )
      }

      return users
        .find()
        .toArray()
        .then((users) => {
          users.forEach((user) =>
            user.saves?.splice(
              (user.saves.findIndex((save) => save === postId), 1)
            )
          )
          return posts.deleteOne({ _id: new ObjectId(postId) })
        })
    })
  })
}
