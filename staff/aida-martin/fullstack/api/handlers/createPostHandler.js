const { createPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { image, text } = req.body

  const promise = createPost(userId, image, text)

  return (async () => {
    await promise

    res.status(201).send()
  })()
})
