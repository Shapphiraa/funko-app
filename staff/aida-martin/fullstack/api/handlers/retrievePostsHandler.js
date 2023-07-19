const { retrievePosts } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const promise = retrievePosts(userId)

  return (async () => {
    const posts = await promise

    res.json(posts)
  })()
})
