const { readFile, writeFile } = require('fs')

module.exports = function updateUserPassword (userId, password, newPassword, newPasswordConfirm, callback) {
  //validators

  if (newPassword !== newPasswordConfirm) { throw new Error('New passwords do not match 😥') }

  if (newPassword === password) {
    throw new Error('Your new password matches the current one 😥')
  }

  if (!newPasswordConfirm.length) {
    throw new Error('You have not confirm your new password 😥')
  }

  if (newPassword.length < 8) {
    throw new Error('Your password does not have 8 characters 😥')
  }

  readFile('../data/users.json', 'utf-8', (error, json) => {
    if (error) {
      callback(error)

      return
    }

    const users = JSON.parse(json)

    let user = users.find(user => user.id === userId)

    if (!user) {
      callback(new Error('User not found! 😥'))

      return
    }

    if (password !== user.password) {
      callback(new Error('Wrong password 😥'))

      return
    }

    user.password = newPassword

    json = JSON.stringify(users)

    writeFile('../data/users.json', json, 'utf-8', error => {
      if (error) {
        callback(error)

        return
      }

      callback(null)
    })
  })
}