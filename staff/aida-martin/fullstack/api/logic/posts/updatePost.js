const {
  validators: { validateId, validateUrl, validateText },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function updatePost(userId, postId, image, text) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateUrl(image, 'Image URL')
  validateText(text, 'Text')

  const { users, posts } = context

  return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
    if (!user) throw new Error('User not found! 😥')

    return posts.findOne({ _id: new ObjectId(postId) }).then((post) => {
      if (!post) throw new Error('Post not found! 😥')

      if (post.author.toString() !== userId) {
        throw new Error(
          `Post with ID ${post._id.toString()} does not belong to user with ID ${userId} 😥`
        )
      }

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { image: image, text: text } }
      )
    })
  })
}
