require('dotenv').config()

const express = require('express')

const { cors, jsonBodyParser } = require('./utils')

const {
  helloApiHandler,
  registerUserHandler,
  authenticateUserHandler,
  retrieveUserHandler,
  updateUserAvatarHandler,
  updateUserPasswordHandler,
  createPostHandler,
  retrievePostHandler,
  retrievePostsHandler,
  retrieveSavedPostsHandler,
  deletePostHandler,
  updatePostHandler,
  togglePrivatizePostHandler,
  toggleLikePostHandler,
  toggleSavePostHandler,
  buyPostHandler,
  sellPostHandler,
} = require('./handlers')

const mongodb = require('mongodb')

const { MongoClient } = mongodb
const context = require('./logic/context')

//en la ruta se pondría localhost en vez de 127.0.0.1 (pero no funciona)
const client = new MongoClient(process.env.MONGODB_URL)

//promises:
client
  .connect()
  //el then encadena otra promesa a la anterior, hasta que la anterior no termina, el then no se procesa
  .then((connection) => {
    const db = connection.db()

    //cargamos los manejadores y los guardamos en contexto para usarlos en las lógicas
    context.users = db.collection('users')
    context.posts = db.collection('posts')

    const api = express()

    api.use(cors)

    api.get('/', helloApiHandler)

    api.post('/users', jsonBodyParser, registerUserHandler)
    api.post('/users/auth', jsonBodyParser, authenticateUserHandler)
    api.get('/users', retrieveUserHandler)
    api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)
    api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

    api.post('/posts', jsonBodyParser, createPostHandler)
    api.get('/posts/saved', retrieveSavedPostsHandler)
    api.get('/posts/:postId', retrievePostHandler)
    api.get('/posts', retrievePostsHandler)
    api.delete('/posts/:postId', deletePostHandler)
    api.patch('/posts/:postId', jsonBodyParser, updatePostHandler)
    api.patch('/posts/:postId/visibility', togglePrivatizePostHandler)
    api.patch('/posts/:postId/likes', toggleLikePostHandler)
    api.patch('/posts/:postId/saves', toggleSavePostHandler)
    api.patch('/posts/:postId/buy', buyPostHandler)
    api.patch('/posts/:postId/sale', jsonBodyParser, sellPostHandler)

    api.listen(process.env.PORT, () =>
      console.log(`server running in port ${process.env.PORT}`)
    )
  })
  .catch((error) => {
    console.log(error)
  })

//escuchamos el puerto (server) que le enviamos desde .env

//en consola "npm run start" (node .) para arrancarlo o "npm run watch" (--watch node .) (con este se va actualizando solo cuando guardamos y no hay que tirar y montar el servidor todo el rato) y vamos en el navegador a la ruta localhost:4321 (4321 porque es el que hemos configurado en el .env)
