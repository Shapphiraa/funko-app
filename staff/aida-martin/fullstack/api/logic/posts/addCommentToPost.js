const {
  validators: { validateId, validateText, validateUrl },
  errors: { ExistenceError },
} = require('com')

const { User, Post, Comment } = require('../../data/models')

module.exports = function addCommentToPost(userId, postId, text) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateText(text)

  return (async () => {
    const [user, post] = await Promise.all([
      User.findById(userId),
      Post.findById(postId),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')

    if (!post) throw new ExistenceError('Post not found! 😥')

    const comment = new Comment({
      author: userId,
      text,
    })

    post.comments.push(comment)

    await post.save()
  })()
}
