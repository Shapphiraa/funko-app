const {
  validators: { validateId },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function retrievePost(userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  const { users, posts } = context

  return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
    if (!user) throw new Error('User not found! 😥')

    return posts.findOne({ _id: new ObjectId(postId) }).then((post) => {
      if (!post) throw new Error('Post not found! 😥')

      return post
    })
  })
}
