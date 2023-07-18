const {
  validators: { validateId, validateUrl },
  errors: { ExistenceError },
} = require('com')

const { User } = require('../../data/models')

module.exports = function updateUserAvatar(userId, url) {
  validateId(userId, 'User ID')
  validateUrl(url, 'Avatar url')

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    await User.updateOne({ _id: userId }, { $set: { avatar: url } })
  })()
}
