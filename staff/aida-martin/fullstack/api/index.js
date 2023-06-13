require('dotenv').config()

const express = require('express')

const { cors, jsonBodyParser } = require('./utils')

const { helloApiMid, registerUserMid, authenticateUserMid, retrieveUserMid, updateUserAvatarMid, updateUserPasswordMid, createPostMid, retrievePostMid, retrievePostsMid, retrieveSavedPostsMid, deletePostMid, updatePostMid, togglePrivatizePostMid, toggleLikePostMid, toggleSavePostMid, buyPostMid, sellPostMid } = require('./middlewares')

const api = express()

api.use(cors)

api.get('/', helloApiMid)

api.post('/users', jsonBodyParser, registerUserMid)
api.post('/users/auth', jsonBodyParser, authenticateUserMid)
api.get('/users', retrieveUserMid)
api.patch('/users/avatar', jsonBodyParser, updateUserAvatarMid)
api.patch('/users/password', jsonBodyParser, updateUserPasswordMid)

api.post('/posts', jsonBodyParser, createPostMid)
api.get('/posts/saved', retrieveSavedPostsMid)
api.get('/posts/:postId', retrievePostMid)
api.get('/posts', retrievePostsMid)
api.delete('/posts/:postId', deletePostMid)
api.patch('/posts/:postId', jsonBodyParser, updatePostMid)
api.patch('/posts/:postId/visibility', togglePrivatizePostMid)
api.patch('/posts/:postId/likes', toggleLikePostMid)
api.patch('/posts/:postId/saves', toggleSavePostMid)
api.patch('/posts/:postId/buy', buyPostMid)
api.patch('/posts/:postId/sale', jsonBodyParser, sellPostMid)

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
//escuchamos el puerto (server) que le enviamos desde .env

//en consola "npm run start" (node .) para arrancarlo o "npm run watch" (--watch node .) (con este se va actualizando solo cuando guardamos y no hay que tirar y montar el servidor todo el rato) y vamos en el navegador a la ruta localhost:4321 (4321 porque es el que hemos configurado en el .env)