const express = require('express')
const { registerUser } = require('./logic')

const api = express()

//get para pedir algo (cuando buscamos en google por ejemplo). TRAER DATOS
api.get('/', (req, res) => res.json('Hello, World!')) //prueba para ver que el servidor está levantado

api.get('/helloworld', (req, res) => res.json({ hello: 'world' })) //prueba de ruta
//req = request (lo que enviamos al servidor desde el navegador), res = response (lo que quieres responder al navegador desde el servidor)

//post de postear (enviar algo), nada que ver con nuestros posts :). ENVIAR DATOS
api.post('/users', (req, res) => {
  //utilizando insomnia vamos a enviar un JSON y se va a recibir en forma de string como un "churro" de bits. Para parsearlo y poder verlo:
  let json = ''

  req.on('data', chunk => {
    json += chunk
  })

  req.on('end', () => {
    const { name, email, password, repeatPassword } = JSON.parse(json)

    try {

      registerUser(name, email, password, repeatPassword, error => {
        if (error) {
        res.status(400).json({ error: error.message})
        
        return
        }
        
        //El 201 para decir que estamos enviando algo (los 200 es que todo ha ido bien)
        res.status(201).send()
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })
})

//TODO: api.post('/users/auth', (req, res) => {}) (authenthicateUser, return userId in json)

//TODO: api.get('/users/:userId/auth', (req, res)) => {}) (retrieveUser, return user in json)

api.listen(4000)
//escuchamos un puerto (server)

//en consola "node ." (para arrancarlo) y vamos en el navegadr a la ruta localhost:4000 o localhost:4000/helloworld