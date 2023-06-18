const {
  validators: { validateId, validatePassword, validateCallback },
} = require('com')
const { readFile, writeFile } = require('fs')

module.exports = function updateUserPassword(
  userId,
  password,
  newPassword,
  newPasswordConfirm,
  callback
) {
  validateId(userId, 'User ID')
  validatePassword(password)
  validatePassword(newPassword, 'New password')
  validateCallback(callback)

  if (newPassword !== newPasswordConfirm) {
    throw new Error('New passwords do not match 😥')
  }

  if (newPassword === password) {
    throw new Error('Your new password matches the current one 😥')
  }

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if (error) {
      callback(error)

      return
    }

    const users = JSON.parse(json)

    let user = users.find((user) => user.id === userId)

    if (!user) {
      callback(new Error('User not found! 😥'))

      return
    }

    if (password !== user.password) {
      callback(new Error('Wrong password 😥'))

      return
    }

    user.password = newPassword

    json = JSON.stringify(users, null, 4)

    writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
      if (error) {
        callback(error)

        return
      }

      callback(null)
    })
  })
}
