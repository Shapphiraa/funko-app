const { updateUserPassword } = require('../logic')
const { extractUserId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { password, newPassword, newPasswordConfirm } = req.body

  return updateUserPassword(
    userId,
    password,
    newPassword,
    newPasswordConfirm
  ).then(() => res.status(204).send())
})
