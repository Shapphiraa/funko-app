const { authenticateUser } = require('../logic')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  try {
    const { email, password } = req.body

    authenticateUser(email, password)
      .then((userId) => {
        const payload = { sub: userId }

        const { JWT_SECRET, JWT_EXPIRATION } = process.env

        const token = jwt.sign(payload, JWT_SECRET, {
          expiresIn: JWT_EXPIRATION,
        })

        res.json(token)
      })
      .catch((error) => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
