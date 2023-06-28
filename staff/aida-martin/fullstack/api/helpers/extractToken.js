module.exports = function extractToken(req) {
  const { authorization } = req.headers
  // La autorización vendrá así: "Bearer user-id"
  const token = authorization.slice(7)

  return token
}
