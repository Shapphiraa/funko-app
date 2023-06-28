const {
  validators: { validateId },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function buyPost(userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  const { users, posts } = context

  return Promise.all([
    users.findOne({ _id: new ObjectId(userId) }),
    posts.findOne({ _id: new ObjectId(postId) }),
  ]).then(([user, post]) => {
    if (!user) throw new Error('User not found! 😥')

    if (!post) throw new Error('Post not found! 😥')

    if (post.author.toString() === userId) {
      throw new Error(
        `Post with ID ${post._id.toString()} already belong to user with ID ${userId} 😥`
      )
    }

    return posts.updateOne(
      { _id: new ObjectId(postId) },
      { $set: { price: 0, author: new ObjectId(userId) } }
    )
  })
}
