const { registerUser } = require('../logic')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const { name, email, password, repeatPassword } = req.body

  return registerUser(name, email, password, repeatPassword).then(() =>
    res.status(201).send()
  )
})
