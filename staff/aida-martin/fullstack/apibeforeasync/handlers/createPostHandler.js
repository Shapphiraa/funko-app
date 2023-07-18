const { createPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { image, text } = req.body

  return createPost(userId, image, text).then(() => res.status(201).send())
})
