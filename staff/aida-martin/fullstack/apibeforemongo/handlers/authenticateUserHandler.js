const { authenticateUser } = require('../logic')

module.exports = (req, res) => {
  try {
    const { email, password } = req.body

    authenticateUser(email, password, (error, userId) => {
      if (error) {
        res.status(400).json({ error: error.message })

        return
      }

      //Si no ponemos nada, es un 200 de que todo está bien (genérico)
      res.json({ userId })
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
