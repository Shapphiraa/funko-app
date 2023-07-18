const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com')

const { User } = require('../../data/models')

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

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    const { name, avatar } = user

    const nameUser = name.split(' ')[0]

    return {
      name: nameUser,
      avatar,
    }
  })()
}
