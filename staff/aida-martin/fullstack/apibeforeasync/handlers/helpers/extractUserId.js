const jwt = require('jsonwebtoken')

function extractUserId(req) {
  const { authorization } = req.headers
  // La autorización vendrá así: "Bearer user-id"
  const token = authorization.slice(7)

  const payload = jwt.verify(token, process.env.JWT_SECRET)

  const { sub: userId } = payload

  return userId
}

module.exports = extractUserId
