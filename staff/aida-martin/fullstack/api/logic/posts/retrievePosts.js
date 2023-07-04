const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function retrievePosts(userId) {
  validateId(userId, 'User ID')

  const { users, posts } = context

  return Promise.all([
    users.find().toArray(),
    posts
      .find({
        $or: [{ visibility: 'public' }, { author: new ObjectId(userId) }],
      })
      .toArray(),
  ]).then(([users, posts]) => {
    const user = users.find((user) => user._id.toString() === userId)

    if (!user) throw new ExistenceError(`user with id ${userId} not found`)

    posts.forEach((post) => {
      post.id = post._id.toString()
      delete post._id

      post.saves = user.saves.some((save) => save.toString() === post.id)

      const _user = users.find(
        (user) => user._id.toString() === post.author.toString()
      )

      post.author = {
        id: _user._id.toString(),
        name: _user.name.split(' ')[0],
        avatar: _user.avatar,
      }
    })

    return posts.reverse()
  })
}
