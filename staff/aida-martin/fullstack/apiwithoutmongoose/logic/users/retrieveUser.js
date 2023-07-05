const {
  validators: { validateId, validateCallback },
  errors: { ExistenceError },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

/**
 * Retrieves a user by id
 *
 * @param {string} userId
 * @returns {Promise<Object>}
 *
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On empty user id
 * @throws {ExistenceError} On non-existing user
 */

module.exports = function retrieveUser(userId) {
  validateId(userId, 'User ID')

  const { users } = context

  return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
    if (!user) throw new ExistenceError('User not found! 😥')

    const { name, avatar } = user

    const nameUser = name.split(' ')[0]

    return {
      name: nameUser,
      avatar,
    }
  })
}
