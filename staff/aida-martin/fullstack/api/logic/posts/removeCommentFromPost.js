const {
  validators: { validateId, validateText },
  errors: { ExistenceError, PropertyError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function removeCommentFromPost(userId, postId, commentId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateId(commentId, 'Comment ID')

  return (async () => {
    const [user, post] = await Promise.all([
      User.findById(userId),
      Post.findById(postId),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')
    if (!post) throw new ExistenceError('Post not found! 😥')

    const index = post.comments.findIndex((comment) => comment.id === commentId)

    if (index < 0)
      throw new ExistenceError(
        `Comment with ID ${commentId} not found in post with ID ${postId}! 😥`
      )

    const comment = post.comments[index]

    if (comment.author.toString() !== userId)
      throw new PropertyError(
        `Comment with ID ${commentId} does not belong to user with ID ${userId}! 😥`
      )

    post.comments.splice(index, 1)

    await post.save()
  })()
}
