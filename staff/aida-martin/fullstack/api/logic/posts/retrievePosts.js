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
    User.findById(userId).lean(),
    Post.find(
      {
        $or: [{ visibility: 'public' }, { author: userId }],
      },
      '-__v'
    )
      .sort('-date')
      .populate('author', '-email -password -saves -__v')
      .lean(),
  ]).then(([user, posts]) => {
    if (!user) throw new ExistenceError(`user with id ${userId} not found`)

    posts.forEach((post) => {
      post.author.name = post.author.name.split(' ')[0]

      post.id = post._id.toString()
      delete post._id

      post.saves = user.saves.some((save) => save.toString() === post.id)

      if (post.author._id) {
        post.author.id = post.author._id.toString()
        delete post.author._id
      }
    })

    return posts
  })
}
