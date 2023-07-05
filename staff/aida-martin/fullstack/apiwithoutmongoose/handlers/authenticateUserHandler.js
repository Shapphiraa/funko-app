const { authenticateUser } = require('../logic')
const { handleErrors } = require('./helpers')

const jwt = require('jsonwebtoken')

module.exports = handleErrors((req, res) => {
  const { email, password } = req.body

  return authenticateUser(email, password).then((userId) => {
    const payload = { sub: userId }

    const { JWT_SECRET, JWT_EXPIRATION } = process.env

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    })

    res.json(token)
  })
})
