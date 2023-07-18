const { retrievePosts } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  return retrievePosts(userId).then((posts) => res.json(posts))
})
