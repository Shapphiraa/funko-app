const {
  validators: { validateId },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function retrievePost(userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  const { users, posts } = context

  return Promise.all([
    users.findOne({ _id: new ObjectId(userId) }),
    posts.findOne({ _id: new ObjectId(postId) }),
  ]).then(([user, post]) => {
    if (!user) throw new Error('User not found! 😥')

    if (!post) throw new Error('Post not found! 😥')

    const index = post.likes.map((id) => id.toString()).indexOf(userId)

    console.log(post)
    return post
  })
}
