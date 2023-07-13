const { removeCommentFromPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { postId, commentId } = req.params

  return removeCommentFromPost(userId, postId, commentId).then(() =>
    res.status(204).send()
  )
})
