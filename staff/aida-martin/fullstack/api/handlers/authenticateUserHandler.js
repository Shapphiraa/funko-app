const { authenticateUser } = require('../logic')
const { handleErrors } = require('./helpers')

const jwt = require('jsonwebtoken')

module.exports = handleErrors((req, res) => {
  const { email, password } = req.body

  const promise = authenticateUser(email, password)

  return (async () => {
    const userId = await promise

    const payload = { sub: userId }

    const { JWT_SECRET, JWT_EXPIRATION } = process.env

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    })

    res.json(token)
  })()
})
