const {
  validators: { validateName, validateEmail, validatePassword },
} = require('com')

const context = require('../context')

module.exports = function registerUser(name, email, password, repeatPassword) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  const { users } = context

  if (password !== repeatPassword)
    throw new Error('Passwords does not match 😢')

  return users.findOne({ email }).then((user) => {
    if (user) throw new Error('You are already registered! Please login! 😅')

    return users.insertOne({ name, email, password, avatar: null, saves: [] })
  })
}
