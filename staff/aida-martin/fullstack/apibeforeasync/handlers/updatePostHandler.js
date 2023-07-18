const { updatePost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { postId } = req.params
  const { image, text } = req.body

  return updatePost(userId, postId, image, text).then(() =>
    res.status(204).send()
  )
})
