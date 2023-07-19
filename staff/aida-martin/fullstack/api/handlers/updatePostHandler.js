const { updatePost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { postId } = req.params
  const { image, text } = req.body

  const promise = updatePost(userId, postId, image, text)

  return (async () => {
    await promise

    res.status(204).send()
  })()
})
