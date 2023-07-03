const { retrieveUser } = require('../logic')
const { extractUserId } = require('./helpers')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)

    retrieveUser(userId)
      .then((user) => res.json(user))
      .catch((error) => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
