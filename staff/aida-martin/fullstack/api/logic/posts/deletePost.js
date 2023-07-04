const {
  validators: { validateId },
  errors: { ExistenceError, PropertyError },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function deletePost(userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  const { users, posts } = context

  return Promise.all([
    users.findOne({ _id: new ObjectId(userId) }),
    posts.findOne({ _id: new ObjectId(postId) }),
  ]).then(([user, post]) => {
    if (!user) throw new ExistenceError('User not found! 😥')

    if (!post) throw new ExistenceError('Post not found! 😥')

    if (post.author.toString() !== userId) {
      throw new PropertyError(
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
}
