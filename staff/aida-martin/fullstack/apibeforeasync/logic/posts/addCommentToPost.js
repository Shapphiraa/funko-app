const {
  validators: { validateId, validateText, validateUrl },
  errors: { ExistenceError },
} = require('com')

const { User, Post, Comment } = require('../../data/models')

module.exports = function addCommentToPost(userId, postId, text) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateText(text)

  return Promise.all([User.findById(userId), Post.findById(postId)]).then(
    ([user, post]) => {
      if (!user) throw new ExistenceError('User not found! 😥')

      if (!post) throw new ExistenceError('Post not found! 😥')

      // No se haría con un create porque no queremos guardarlo en una colección aparte, es una colección dentro de la colección de post

      // return Comment.create({
      //   author: userId,
      //   text,
      // })

      // Creamos un nuevo comentario
      const comment = new Comment({
        author: userId,
        text,
      })

      // Lo pusheamos al array de comentarios del post
      post.comments.push(comment)

      // Guardamos el post en DB
      return post.save()
    }
  )
}
