const { retrievePost } = require('../logic')
const { extractToken } = require('../helpers')

const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  try {
    const token = extractToken(req)

    const payload = jwt.verify(token, process.env.SECRET)

    const { sub: userId } = payload

    const { postId } = req.params

    retrievePost(userId, postId)
      .then((post) => res.json(post))
      .catch((error) => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
