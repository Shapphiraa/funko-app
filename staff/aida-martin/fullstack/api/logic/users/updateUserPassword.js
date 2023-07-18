const {
  validators: { validateId, validatePassword },
  errors: { ContentError, ExistenceError, AuthError },
} = require('com')

const { User } = require('../../data/models')

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

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    if (user.password !== password) throw new AuthError('Wrong password! 😢')

    await User.updateOne({ _id: userId }, { $set: { password: newPassword } })
  })()
}
