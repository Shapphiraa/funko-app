const { registerUser } = require('../logic')

module.exports = (req, res) => {
  try {
    const { name, email, password, repeatPassword } = req.body

    registerUser(name, email, password, repeatPassword, (error) => {
      debugger
      if (error) {
        res.status(400).json({ error: error.message })

        return
      }

      //El 201 para decir que estamos enviando algo (los 200 es que todo ha ido bien)
      res.status(201).send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
