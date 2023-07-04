const { sellPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { postId } = req.params
  const { price } = req.body

  return sellPost(userId, postId, price).then(() => res.status(204).send())
})
