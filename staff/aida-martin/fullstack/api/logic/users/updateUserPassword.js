const { validators: { validateId, validatePassword, validateCallback } } = require('com')
const { readFile, writeFile } = require('fs')

module.exports = function updateUserPassword (userId, password, newPassword, newPasswordConfirm, callback) {
  validateId(userId, 'User ID')
  validatePassword(password)
  validatePassword(newPassword, 'New password')
  validatePassword(password)
  validateCallback(callback)

  if (newPassword !== newPasswordConfirm) { 
    callback(new Error('New passwords do not match 😥'))
  
    return
  }

  if (newPassword === password) {
    callback(new Error('Your new password matches the current one 😥'))

    return
  }

  readFile('./data/users.json', 'utf-8', (error, json) => {
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

    writeFile('./data/users.json', json, 'utf-8', error => {
      if (error) {
        callback(error)

        return
      }

      callback(null)
    })
  })
}