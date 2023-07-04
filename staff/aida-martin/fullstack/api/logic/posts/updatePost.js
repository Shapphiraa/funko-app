const {
  validators: { validateId, validateUrl, validateText },
  errors: { ExistenceError, PropertyError },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function updatePost(userId, postId, image, text) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateUrl(image, 'Image URL')
  validateText(text, 'Text')

  const { users, posts } = context

  return Promise.all([
    users.findOne({ _id: new ObjectId(userId) }),
    posts.findOne({ _id: new ObjectId(postId) }),
  ]).then(([user, post]) => {
    if (!user) throw new ExistenceError('User not found! 😥')

    if (!post) throw new ExistenceError('Post not found! 😥')

    if (post.author.toString() !== userId) {
      throw new PropertyError(
        `Post with ID ${post._id.toString()} does not belong to user with ID ${userId} 😥`
      )
    }

    return posts.updateOne(
      { _id: new ObjectId(postId) },
      { $set: { image: image, text: text } }
    )
  })
}
