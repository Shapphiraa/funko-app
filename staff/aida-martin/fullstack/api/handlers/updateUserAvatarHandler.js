const { updateUserAvatar } = require('../logic')
const { extractUserId } = require('./helpers')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)

    const { avatar } = req.body

    updateUserAvatar(userId, avatar)
      .then(() => res.status(204).send())
      .catch((error) => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
