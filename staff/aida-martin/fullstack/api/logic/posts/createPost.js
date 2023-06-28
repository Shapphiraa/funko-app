const {
  validators: { validateId, validateText, validateUrl },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function createPost(userId, image, text) {
  validateId(userId, 'User ID')
  validateUrl(image, 'Image URL')
  validateText(text)

  const { users, posts } = context

  return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
    if (!user) throw new Error('User not found! 😥')

    return posts.insertOne({
      author: userId,
      image,
      text,
      date: new Date(),
      likes: [],
      visibility: 'public',
      price: 0,
    })
  })
}
