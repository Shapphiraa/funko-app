const {
  validators: { validateEmail, validatePassword, validateCallback },
} = require('com')
const { readFile } = require('fs')

module.exports = function authenticateUser(email, password, callback) {
  validateEmail(email)
  validatePassword(password)
  validateCallback(callback)

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if (error) {
      callback(error)

      return
    }

    const users = JSON.parse(json)

    let user = users.find((user) => user.email === email)

    if (!user) {
      callback(new Error('User not found! 😥'))

      return
    }

    if (user.password !== password) {
      callback(new Error('Wrong password 😥'))

      return
    }

    callback(null, user.id)
  })
}
