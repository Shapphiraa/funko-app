const {
  validators: { validateName, validateEmail, validatePassword },
  errors: { DuplicityError, ContentError },
} = require('com')

const { User } = require('../../data/models')

module.exports = function registerUser(name, email, password, repeatPassword) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  if (password !== repeatPassword)
    throw new ContentError('Passwords does not match 😢')

  return User.create({ name, email, password, avatar: null, saves: [] }).catch(
    (error) => {
      //Con esto convertimos ese error de Mongo (el índice-index que habíamos creado) a un error nuestro
      if (error.message.includes('E11000'))
        throw new DuplicityError('You are already registered! Please login! 😅')
    }
  )
}
