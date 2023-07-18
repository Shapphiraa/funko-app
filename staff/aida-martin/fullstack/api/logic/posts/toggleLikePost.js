const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function toggleLikePost(userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  return (async () => {
    const [user, post] = await Promise.all([
      User.findById(userId),
      Post.findById(postId),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')
    if (!post) throw new ExistenceError('Post not found! 😥')

    const index = post.likes.findIndex((id) => id.toString() === userId)

    if (index < 0) {
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } })
    } else {
      post.likes.splice(index, 1)

      await Post.updateOne({ _id: postId }, { $set: { likes: post.likes } })
    }
  })()
}
