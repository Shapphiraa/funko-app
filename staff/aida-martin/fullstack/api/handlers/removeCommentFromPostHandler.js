const { removeCommentFromPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { postId, commentId } = req.params

  const promise = removeCommentFromPost(userId, postId, commentId)

  return (async () => {
    await promise

    res.status(204).send()
  })()
})
