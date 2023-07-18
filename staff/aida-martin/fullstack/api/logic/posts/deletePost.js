const {
  validators: { validateId },
  errors: { ExistenceError, PropertyError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function deletePost(userId, postId) {
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

    const users = await User.find({ saves: postId })

    const usersUpdated = users.map((user) => {
      User.updateOne(
        { _id: user.id },
        {
          $pullAll: {
            saves: [postId],
          },
        }
      )
    })

    await Promise.all([...usersUpdated, Post.deleteOne({ _id: postId })])
  })()
}
