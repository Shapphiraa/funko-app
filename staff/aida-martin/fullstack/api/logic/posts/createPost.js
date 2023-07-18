const {
  validators: { validateId, validateText, validateUrl },
  errors: { ExistenceError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function createPost(userId, image, text) {
  validateId(userId, 'User ID')
  validateUrl(image, 'Image URL')
  validateText(text)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError('User not found! 😥')

    await Post.create({
      author: userId,
      image,
      text,
    })
  })()
}
