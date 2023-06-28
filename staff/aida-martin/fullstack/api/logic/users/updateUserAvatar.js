const {
  validators: { validateId, validateUrl },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function updateUserAvatar(userId, url) {
  validateId(userId, 'User ID')
  validateUrl(url, 'Avatar url')

  const { users } = context

  return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
    if (!user) throw new Error('User not found! 😥')

    return users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { avatar: url } }
    )
  })
}
