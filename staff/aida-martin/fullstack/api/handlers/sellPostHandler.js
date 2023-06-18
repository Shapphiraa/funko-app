const { sellPost } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)

    const { postId } = req.params
    const { price } = req.body

    sellPost(userId, postId, price, (error) => {
      if (error) {
        res.status(400).json({ error: error.message })

        return
      }

      res.status(204).send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
