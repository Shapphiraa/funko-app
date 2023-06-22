const {
  validators: { validateId, validateCallback },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function retrieveUser(userId) {
  validateId(userId, 'User ID')

  const { users } = context

  //findOne (el primero que encuentra)
  //find (array con todos los match)
  return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
    if (!user) throw new Error('User not found! 😥')

    const { name, avatar } = user

    const nameUser = name.split(' ')[0]

    return {
      name: nameUser,
      avatar,
    }
  })
}
