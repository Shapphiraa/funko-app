const { retrievePosts } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)

    retrievePosts(userId, (error, posts) => {
      if (error) {
        res.status(400).json({ error: error.message })

        return
      }

      res.json(posts)
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
