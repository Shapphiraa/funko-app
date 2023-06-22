const {
  validators: { validateId, validateUrl, validateCallback },
} = require('com')
const { readFile, writeFile } = require('fs')

module.exports = function updateUserAvatar(userId, url, callback) {
  validateId(userId, 'User ID')
  validateUrl(url, 'Avatar url')
  validateCallback(callback)

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if (error) {
      callback(error)

      return
    }

    const users = JSON.parse(json)

    let user = users.find((user) => user.id === userId)

    if (!user) {
      callback(new Error('User not found! 😥'))

      return
    }

    user.avatar = url

    json = JSON.stringify(users, null, 4)

    writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
      if (error) {
        callback(error)

        return
      }

      callback(null)
    })
  })
}
