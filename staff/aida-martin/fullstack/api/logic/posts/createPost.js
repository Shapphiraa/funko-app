const {
  validators: { validateId, validateText, validateUrl },
  errors: { ExistenceError },
} = require('com')

const { User, Post } = require('../../data/models')

module.exports = function createPost(userId, image, text) {
  validateId(userId, 'User ID')
  validateUrl(image, 'Image URL')
  validateText(text)

  return (
    User.findById(userId)
      .then((user) => {
        if (!user) throw new ExistenceError('User not found! 😥')

        return Post.create({
          author: user.id,
          image,
          text,
          date: new Date(),
          likes: [],
          visibility: 'public',
          price: 0,
        })
      })
      //no debemos devolver nada afuera (que no se exponga)
      //hacemos una promesa vacía para que aunque se pida un resultado desde fuera (result) no se pueda acceder
      .then(() => {})
  )
}
