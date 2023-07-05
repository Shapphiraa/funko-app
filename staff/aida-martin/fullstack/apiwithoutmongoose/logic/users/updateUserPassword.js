const {
  validators: { validateId, validatePassword },
  errors: { ContentError, ExistenceError },
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

  if (newPassword !== newPasswordConfirm)
    throw new ContentError('New passwords do not match 😥')

  if (newPassword === password)
    throw new ContentError('Your new password matches the current one 😥')

  const { users } = context

  return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
    if (!user) throw new ExistenceError('User not found! 😥')

    if (user.password !== password) throw new AuthError('Wrong password! 😢')

    return users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { password: newPassword } }
    )
  })
}
