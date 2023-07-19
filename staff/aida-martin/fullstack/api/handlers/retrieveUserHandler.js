const { retrieveUser } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const promise = retrieveUser(userId)

  return (async () => {
    const user = await promise

    res.json(user)
  })()
})
