const { retrieveSavedPosts } = require('../logic')
const { extractToken } = require('../helpers')

const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  try {
    const token = extractToken(req)

    const payload = jwt.verify(token, process.env.SECRET)

    const { sub: userId } = payload

    retrieveSavedPosts(userId)
      .then((savedPosts) => res.json(savedPosts))
      .catch((error) => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
