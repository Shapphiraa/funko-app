const { authenticateUser } = require('../logic')

module.exports = (req, res) => {
  try {
    const { email, password } = req.body

    authenticateUser(email, password)
      //Si no pasamos nada, es un 200
      .then((userId) => res.json(userId))
      .catch((error) => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
