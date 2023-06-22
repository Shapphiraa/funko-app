const { registerUser } = require('../logic')

module.exports = (req, res) => {
  try {
    const { name, email, password, repeatPassword } = req.body

    registerUser(name, email, password, repeatPassword)
      //El 201 para decir que estamos enviando algo (los 200 es que todo ha ido bien)
      .then(() => res.status(201).send())
      .catch((error) => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
