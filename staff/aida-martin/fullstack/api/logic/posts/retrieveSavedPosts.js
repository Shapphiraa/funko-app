const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function retrieveSavedPosts(userId) {
  validateId(userId, 'User ID')

  const { users, posts } = context

  return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
    if (!user) throw new ExistenceError('User not found! 😥')

    savedPostsIds = user.saves

    return Promise.all([
      users.find().toArray(),
      posts
        .find({
          $and: [
            { _id: { $in: savedPostsIds } },
            {
              $or: [{ visibility: 'public' }, { author: new ObjectId(userId) }],
            },
          ],
        })
        .toArray(),
    ]).then(([users, savedPosts]) => {
      savedPosts.forEach((post) => {
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

      return savedPosts.reverse()
    })
  })
}
