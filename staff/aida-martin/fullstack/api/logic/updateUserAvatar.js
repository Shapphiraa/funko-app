const { readFile, writeFile } = require('fs')

module.exports = function updateUserAvatar (userId, url, callback) {
  //validators

  readFile('../data/users.json', 'utf-8', (error, json) => {
    if (error) {
      callback(error)

      return
    }

    const users = JSON.parse(json)

    let user = users.find(user => user.id === userId)

    if (!user) {
      callback(new Error('User not found! 😥'))

      return
    }

    user.avatar = url

    json = JSON.stringify(users)

    writeFile('../data/users.json', json, 'utf-8', error => {
      if (error) {
        callback(error)

        return
      }

      callback(null)
    })
  })
}