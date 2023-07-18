const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function retrievePost(userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  return (async () => {
    const [user, post] = await Promise.all([
      User.findById(userId),
      Post.findById(postId, '-_id -__v -author -date -likes'),
    ])

    if (!user) throw new ExistenceError('User not found! 😥')
    if (!post) throw new ExistenceError('Post not found! 😥')

    return post
  })()
}
