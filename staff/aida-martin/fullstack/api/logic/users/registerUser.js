const {
  validators: {
    validateName,
    validateEmail,
    validatePassword,
    validateCallback,
  },
} = require('com')
const { readFile, writeFile } = require('fs')

module.exports = function registerUser(
  name,
  email,
  password,
  repeatPassword,
  callback
) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)
  validateCallback(callback)

  if (password !== repeatPassword) {
    callback(new Error('Passwords does not match 😢'))

    return
  }

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if (error) {
      callback(error)

      return
    }

    const users = JSON.parse(json)

    let user = users.find((user) => user.email === email)

    if (user) {
      callback(new Error('You are already registered! Please login! 😅'))

      return
    }

    let id = 'user-1'

    const lastUser = users[users.length - 1]

    if (lastUser) {
      id = `user-${parseInt(lastUser.id.slice(5)) + 1}`
    }

    user = {
      id,
      name,
      email,
      password,
      avatar: null,
      saves: [],
    }

    users.push(user)

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
