const {
  validators: { validateId },
  errors: { ExistenceError, PropertyError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function buyPost(userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  return Promise.all([User.findById(userId), Post.findById(postId)])
    .then(([user, post]) => {
      if (!user) throw new ExistenceError('User not found! 😥')

      if (!post) throw new ExistenceError('Post not found! 😥')

      if (post.author.toString() === userId) {
        throw new PropertyError(
          `Post with ID ${post._id.toString()} already belong to user with ID ${userId} 😥`
        )
      }

      return Post.updateOne(
        { _id: postId },
        { $set: { price: 0, author: userId } }
      )
    })

    .then(() => {})
}
