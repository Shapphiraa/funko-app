const {
  validators: { validateId, validatePassword },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function updateUserPassword(
  userId,
  password,
  newPassword,
  newPasswordConfirm
) {
  validateId(userId, 'User ID')
  validatePassword(password)
  validatePassword(newPassword, 'New password')

  if (newPassword !== newPasswordConfirm) {
    throw new Error('New passwords do not match 😥')
  }

  if (newPassword === password) {
    throw new Error('Your new password matches the current one 😥')
  }
  const { users } = context

  return users
    .findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { password: newPassword } }
    )
    .then((user) => {
      if (!user) throw new Error('User not found! 😥')
    })
}
