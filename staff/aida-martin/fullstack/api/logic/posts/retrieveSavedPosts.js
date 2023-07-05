const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function retrieveSavedPosts(userId) {
  validateId(userId, 'User ID')

  return User.findOne({ _id: userId }).then((user) => {
    if (!user) throw new ExistenceError('User not found! 😥')

    const savedPostsIds = user.saves

    return Promise.all([
      User.find(),
      Post.find({
        $and: [
          { _id: { $in: savedPostsIds } },
          {
            $or: [{ visibility: 'public' }, { author: userId }],
          },
        ],
      }),
    ]).then(([users, savedPosts]) => {
      savedPosts.forEach((post) => {
        post.saves = user.saves?.some((save) => save.toString() === post.id)

        const _user = users.find(
          (user) => user._id.toString() === post.author.toString()
        )

        //No funciona con Mongoose, pendiente de arreglar
        post.author = {
          id: _user.id,
          name: _user.name.split(' ')[0],
          avatar: _user.avatar,
        }
      })

      return savedPosts.reverse()
    })
  })
}
