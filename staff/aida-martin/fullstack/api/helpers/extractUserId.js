module.exports = function extractUserId(req) {
  const { authorization } = req.headers
  // La autorización vendrá así: "Bearer user-id"
  const userId = authorization.slice(7)

  return userId
}
