const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function toggleSavePost(userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  const { users, posts } = context

  return Promise.all([
    users.findOne({ _id: new ObjectId(userId) }),
    posts.findOne({ _id: new ObjectId(postId) }),
  ]).then(([user, post]) => {
    if (!user) throw new ExistenceError('User not found! 😥')

    if (!post) throw new ExistenceError('Post not found! 😥')

    const index = user.saves.findIndex((id) => id.toString() === postId)

    if (index < 0) {
      return users.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { saves: new ObjectId(postId) } }
      )
    } else {
      user.saves.splice(index, 1)

      return users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { saves: user.saves } }
      )
    }
  })
}
