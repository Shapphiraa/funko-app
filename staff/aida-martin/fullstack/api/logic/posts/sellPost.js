const {
  validators: { validateId },
  errors: { ExistenceError, PropertyError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function buyPost(userId, postId, price) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  return (async () => {
    const [user, post] = await Promise.all([
      User.findById(userId),
      Post.findById(postId),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')
    if (!post) throw new ExistenceError('Post not found! 😥')

    if (post.author.toString() !== userId) {
      throw new PropertyError(
        `Post with ID ${post._id.toString()} does not belong to user with ID ${userId} 😥`
      )
    }

    await Post.updateOne({ _id: postId }, { $set: { price: price } })
  })()
}
