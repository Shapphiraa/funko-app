module.exports = (req, res, next) => {
  const { 'content-type': contentType } = req.headers

  if (contentType !== 'application/json') {
    res.status(400).json({ error: 'No application/json header found' })

    return
  }

  let json = ''

  req.on('data', (chunk) => {
    json += chunk
  })

  req.on('end', () => {
    try {
      req.body = JSON.parse(json)

      next()
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
}
