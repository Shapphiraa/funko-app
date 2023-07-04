const { retrieveSavedPosts } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  return retrieveSavedPosts(userId).then((savedPosts) => res.json(savedPosts))
})
