const { retrievePost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { postId } = req.params

  const promise = retrievePost(userId, postId)

  return (async () => {
    const post = await promise

    res.json(post)
  })()
})
