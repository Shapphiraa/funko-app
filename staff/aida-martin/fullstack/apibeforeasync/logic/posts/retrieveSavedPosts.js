const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function retrieveSavedPosts(userId) {
  validateId(userId, 'User ID')

  return User.findById(userId)
    .lean()
    .then((user) => {
      if (!user) throw new ExistenceError(`user with id ${userId} not found`)

      return (
        Post.find(
          {
            $and: [
              { _id: { $in: user.saves } },
              { $or: [{ visibility: 'public' }, { author: userId }] },
            ],
          },
          '-__v'
        )
          .sort('-date')
          .populate('author', 'name avatar')
          .populate('comments.author', 'name avatar')
          // .populate('author', '-email -password -saves -__v')
          .lean()
          .then((savedPosts) => {
            savedPosts.forEach((post) => {
              post.author.name = post.author.name.split(' ')[0]

              post.id = post._id.toString()
              delete post._id

              post.saves = user.saves.some(
                (save) => save.toString() === post.id
              )

              if (post.author._id) {
                post.author.id = post.author._id.toString()
                delete post.author._id
              }

              post.comments?.forEach((comment) => {
                comment.id = comment._id.toString()
                delete comment._id

                if (comment.author._id) {
                  comment.author.id = comment.author._id.toString()
                  delete comment.author._id
                }
              })
            })

            return savedPosts
          })
      )
    })
}
