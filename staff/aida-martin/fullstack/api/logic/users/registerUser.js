const {
  validators: { validateName, validateEmail, validatePassword },
} = require('com')

const context = require('../context')
const { DuplicityError } = require('com/errors')

module.exports = function registerUser(name, email, password, repeatPassword) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  const { users } = context

  if (password !== repeatPassword)
    throw new Error('Passwords does not match 😢')

  return users
    .insertOne({ name, email, password, avatar: null, saves: [] })
    .catch((error) => {
      if (error.message.includes('E11000'))
        throw new DuplicityError('You are already registered! Please login! 😅')
    })
}
