const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com')

const {
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose')

const { User, Post } = require('../../data/models')

module.exports = function retrievePosts(userId) {
  validateId(userId, 'User ID')

  return Promise.all([
    User.find(),
    Post.find({
      $or: [{ visibility: 'public' }, { author: userId }],
    }),
  ]).then(([users, posts]) => {
    const user = users.find((user) => user.id === userId)

    if (!user) throw new ExistenceError(`user with id ${userId} not found`)

    posts.forEach((post) => {
      post.saves = user.saves.some((save) => save.toString() === post.id)

      const _user = users.find((user) => user.id === post.author.toString())

      //No funciona con Mongoose, pendiente de arreglar
      post.author = {
        id: _user.id,
        name: _user.name.split(' ')[0],
        avatar: _user.avatar,
      }
    })

    return posts.reverse()
  })
}
