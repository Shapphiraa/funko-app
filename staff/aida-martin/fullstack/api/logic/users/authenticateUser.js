const {
  validators: { validateEmail, validatePassword },
} = require('com')

const context = require('../context')

module.exports = function authenticateUser(email, password) {
  validateEmail(email)
  validatePassword(password)

  const { users } = context

  return users.findOne({ email }).then((user) => {
    if (!user) throw new Error('User not found! 😥')

    if (user.password !== password) throw new Error('Wrong password! 😥')

    return user._id.toString()
  })
}
