const {
  validators: { validateName, validateEmail, validatePassword },
  errors: { DuplicityError },
} = require('com')

const context = require('../context')

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
      //Con esto convertimos ese error de Mongo (el índice-index que habíamos creado) a un error nuestro
      if (error.message.includes('E11000'))
        throw new DuplicityError('You are already registered! Please login! 😅')
    })
}
