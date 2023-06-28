const {
  validators: { validateId, validateCallback },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function retrieveSavedPosts(userId) {
  validateId(userId, 'User ID')

  const { users, posts } = context

  return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
    if (!user) throw new Error('User not found! 😥')

    savedPostsIds = user.saves

    savedPostsIds = savedPostsIds?.map((id) => new ObjectId(id))

    return users
      .find()
      .toArray()
      .then((users) => {
        return posts
          .find({
            $and: [
              { _id: { $in: [savedPostsIds] } },
              { $or: [{ visibility: 'public' }, { author: userId }] },
            ],
          })
          .toArray()
          .then((savedPosts) => {
            savedPosts.forEach((post) => {
              post.saves = user.saves?.includes(post._id.toString())

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
  })
}
