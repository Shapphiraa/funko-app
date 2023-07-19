const { registerUser } = require('../logic')
const { handleErrors } = require('./helpers')

// Así envolvemos todo en promesas (no se debería hacer porque los errores síncronos se vuelven asíncronos también)
// module.exports = handleErrors(async (req, res) => {
//   const { name, email, password, repeatPassword } = req.body

//   await registerUser(name, email, password, repeatPassword)

//   res.status(201).send()
// })

// Así separamos todo bien:
module.exports = handleErrors((req, res) => {
  const { name, email, password, repeatPassword } = req.body

  const promise = registerUser(name, email, password, repeatPassword)

  return (async () => {
    await promise

    res.status(201).send()
  })()
})
