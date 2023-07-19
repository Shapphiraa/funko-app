const { addCommentToPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { postId } = req.params
  const { text } = req.body

  const promise = addCommentToPost(userId, postId, text)

  return (async () => {
    await promise

    res.status(201).send()
  })()
})
