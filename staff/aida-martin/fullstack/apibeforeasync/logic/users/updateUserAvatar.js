const {
  validators: { validateId, validateUrl },
  errors: { ExistenceError },
} = require('com')

const { User } = require('../../data/models')

module.exports = function updateUserAvatar(userId, url) {
  validateId(userId, 'User ID')
  validateUrl(url, 'Avatar url')

  return User.findById(userId)
    .then((user) => {
      if (!user) throw new ExistenceError('User not found! 😥')

      return User.updateOne({ _id: userId }, { $set: { avatar: url } })
    })

    .then(() => {})
}
