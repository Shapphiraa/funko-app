const {
  validators: { validateName, validateEmail, validatePassword },
  errors: { DuplicityError, ContentError, UnknownError },
} = require('com')

const { User } = require('../../data/models')
const bcrypt = require('bcryptjs')

module.exports = function registerUser(name, email, password, repeatPassword) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  if (password !== repeatPassword)
    throw new ContentError('Passwords does not match 😢')

  // El async lo que hace es devolver una promesa
  // Con async-await, el try catch te captura los errores síncronos y asíncronos a la vez

  // Este try-catch solo se pone en registerUser porque hay que capturar el error del index

  return (async () => {
    try {
      const hash = await bcrypt.hash(password, 10)

      await User.create({
        name,
        email,
        password: hash,
        avatar: null,
        saves: [],
      })
    } catch (error) {
      if (error.message.includes('E11000'))
        throw new DuplicityError('You are already registered! Please login! 😅')

      throw new UnknownError(error.message)
    }
  })()
}
