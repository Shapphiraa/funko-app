const { retrieveSavedPosts } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const promise = retrieveSavedPosts(userId)

  return (async () => {
    const savedPosts = await promise

    res.json(savedPosts)
  })()
})
