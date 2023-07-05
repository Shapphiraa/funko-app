const {
  validators: { validateId },
  errors: { ExistenceError, PropertyError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function deletePost(userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  return Promise.all([
    User.findOne({ _id: userId }),
    Post.findOne({ _id: postId }),
  ]).then(([user, post]) => {
    if (!user) throw new ExistenceError('User not found! 😥')

    if (!post) throw new ExistenceError('Post not found! 😥')

    if (post.author.toString() !== userId) {
      throw new PropertyError(
        `Post with ID ${post._id.toString()} does not belong to user with ID ${userId} 😥`
      )
    }

    return User.find().then((users) => {
      users.forEach((user) =>
        user.saves?.splice((user.saves.findIndex((save) => save === postId), 1))
      )

      return Post.deleteOne({ _id: postId })
    })
  })
}
