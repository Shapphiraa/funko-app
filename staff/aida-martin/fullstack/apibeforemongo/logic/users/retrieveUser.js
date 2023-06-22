const {
  validators: { validateId, validateCallback },
} = require('com')
const { readFile } = require('fs')

module.exports = function retrieveUser(userId, callback) {
  validateId(userId, 'User ID')
  validateCallback(callback)

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if (error) {
      callback(error)

      return
    }

    const users = JSON.parse(json)

    const user = users.find((user) => user.id === userId)

    if (!user) {
      callback(new Error('User not found! 😥'))

      return
    }

    const { name, avatar } = user

    const nameUser = name.split(' ')[0]

    const user2 = { name: nameUser, avatar }

    callback(null, user2)
  })
}
