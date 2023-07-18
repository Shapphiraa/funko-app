const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function toggleSavePost(userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  return (async () => {
    const [user, post] = await Promise.all([
      User.findById(userId),
      Post.findById(postId),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')
    if (!post) throw new ExistenceError('Post not found! 😥')

    const index = user.saves.findIndex((id) => id.toString() === postId)

    if (index < 0) {
      await User.updateOne({ _id: userId }, { $push: { saves: postId } })
    } else {
      user.saves.splice(index, 1)

      await User.updateOne({ _id: userId }, { $set: { saves: user.saves } })
    }
  })()
}
