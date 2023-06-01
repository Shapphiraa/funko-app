const { readFile } = require('fs')

module.exports = function retrieveUser (userId, callback) {
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

    const _user = {
      name: user.name.split(' ')[0],
      avatar: user.avatar
    }

    const avatar = user.avatar

    if (user.avatar) {
      _user.avatar = avatar
    }

    callback(null, _user)
})
}