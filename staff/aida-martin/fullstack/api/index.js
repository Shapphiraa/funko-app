require('dotenv').config()

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, updateUserAvatar, updateUserPassword, createPost, retrievePost, retrievePosts, retrieveSavedPosts, deletePost, updatePost, togglePrivatizePost, toggleLikePost, toggleSavePost, buyPost, sellPost } = require('./logic')

const api = express()

//Esto se hace para evitar error de conexión CORS (conflicto de acceso por llamar datos desde fuera del dominio del servidor, así con estas cabeceras acepta otros dominios/puertos). El next es para que siga después del use a donde toque
api.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')

  next()
})

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
        debugger
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

api.post('/users/auth', (req, res) => {
  //utilizando insomnia vamos a enviar un JSON y se va a recibir en forma de string como un "churro" de bits. Para parsearlo y poder verlo:
  let json = ''

  req.on('data', chunk => {
    json += chunk
  })

  req.on('end', () => {
    const { email, password } = JSON.parse(json)

    try {

      authenticateUser(email, password, (error, userId) => {
        if (error) {
        res.status(400).json({ error: error.message })
        
        return
        }
        
        //Si no ponemos nada, es un 200 de que todo está bien (genérico)
        res.json({ userId })
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })
})

//TODO: api.get('/users/:userId', (req, res)) => {}) (retrieveUser, return user in json)

api.get('/users/:userId', (req, res) => {

    try {
      const { userId } = req.params

      retrieveUser(userId, (error, user) => {
        if (error) {
        res.status(400).json({ error: error.message })
        
        return
        }
        
        //Si no ponemos nada, es un 200 de que todo está bien (genérico)
        res.json(user)
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })

api.patch('/users/:userId/avatar', (req, res) => {
  let json = ''

  req.on('data', chunk => {
    json += chunk
  })

  req.on('end', () => {
    try {
      const { userId } = req.params
      const { avatar } = JSON.parse(json)

      //Esto es igual:
      //const { userId, avatar } = JSON.parse(json)

      updateUserAvatar(userId, avatar, (error) => {
        if (error) {
        res.status(400).json({ error: error.message })
        
        return
        }
        
        res.status(204).send()
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })
})

api.patch('/users/:userId/password', (req, res) => {
  let json = ''

  req.on('data', chunk => {
    json += chunk
  })

  req.on('end', () => {
    try {
      const { userId } = req.params
      const { password, newPassword, newPasswordConfirm } = JSON.parse(json)

      //Esto es igual:
      //const { userId, password, newPassword, newPasswordConfirm } = JSON.parse(json)

      updateUserPassword(userId, password, newPassword, newPasswordConfirm, (error) => {
        if (error) {
        res.status(400).json({ error: error.message })
        
        return
        }
        
        res.status(204).send()
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })
})

api.post('/posts', (req, res) => {
  let json = ''

  req.on('data', chunk => {
    json += chunk
  })

  req.on('end', () => {
    const { userId, image, text } = JSON.parse(json)

    try {

      createPost(userId, image, text, error => {
        if (error) {
        res.status(400).json({ error: error.message})
        
        return
        }
        
        res.status(201).send()
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })
})

api.get('/posts/:postId/users/:userId', (req, res) => {

  try {
    const { postId, userId } = req.params

    retrievePost(userId, postId, (error, post) => {
      if (error) {
      res.status(400).json({ error: error.message })
      
      return
      }
      
      res.json(post)
    })

  } catch(error) {
    res.status(400).json({ error: error.message})
  }
})

api.get('/posts/users/:userId', (req, res) => {

  try {
    const { userId } = req.params

    retrievePosts(userId, (error, posts) => {
      if (error) {
      res.status(400).json({ error: error.message })
      
      return
      }
      
      res.json(posts)
    })

  } catch(error) {
    res.status(400).json({ error: error.message})
  }
})

api.get('/posts/users/:userId/saved', (req, res) => {

  try {
    const { userId } = req.params

    retrieveSavedPosts(userId, (error, savedPosts) => {
      if (error) {
      res.status(400).json({ error: error.message })
      
      return
      }
      
      res.json(savedPosts)
    })

  } catch(error) {
    res.status(400).json({ error: error.message})
  }
})

api.delete('/posts/:postId/users/:userId', (req, res) => {
  try {
    const { userId, postId } = req.params

    deletePost(userId, postId, (error) => {
      if (error) {
      res.status(400).json({ error: error.message })
      
      return
      }
      
      res.status(200).send()
    })

  } catch(error) {
    res.status(400).json({ error: error.message})
  }
})

api.patch('/posts/:postId', (req, res) => {
  let json = ''

  req.on('data', chunk => {
    json += chunk
  })

  req.on('end', () => {
    try {
      const { postId } = req.params
      const { userId, image, text } = JSON.parse(json)

      updatePost(userId, postId, image, text, (error) => {
        if (error) {
        res.status(400).json({ error: error.message })
        
        return
        }
        
        res.status(204).send()
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })
})

api.patch('/posts/:postId/visibility', (req, res) => {
  let json = ''

  req.on('data', chunk => {
    json += chunk
  })

  req.on('end', () => {
    try {
      const { postId } = req.params
      const { userId } = JSON.parse(json)

      togglePrivatizePost(userId, postId, (error) => {
        if (error) {
        res.status(400).json({ error: error.message })
        
        return
        }
        
        res.status(204).send()
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })
})

api.patch('/posts/:postId/likes', (req, res) => {
  let json = ''

  req.on('data', chunk => {
    json += chunk
  })

  req.on('end', () => {
    try {
      const { postId } = req.params
      const { userId } = JSON.parse(json)

      toggleLikePost(userId, postId, (error) => {
        if (error) {
        res.status(400).json({ error: error.message })
        
        return
        }
        
        res.status(204).send()
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })
})

api.patch('/posts/:postId/saves', (req, res) => {
  let json = ''

  req.on('data', chunk => {
    json += chunk
  })

  req.on('end', () => {
    try {
      const { postId } = req.params
      const { userId } = JSON.parse(json)

      toggleSavePost(userId, postId, (error) => {
        if (error) {
        res.status(400).json({ error: error.message })
        
        return
        }
        
        res.status(204).send()
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })
})

api.patch('/posts/:postId/buy', (req, res) => {
  let json = ''

  req.on('data', chunk => {
    json += chunk
  })

  req.on('end', () => {
    try {
      const { postId } = req.params
      const { userId } = JSON.parse(json)

      buyPost(userId, postId, (error) => {
        if (error) {
        res.status(400).json({ error: error.message })
        
        return
        }
        
        res.status(204).send()
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })
})

api.patch('/posts/:postId/sale', (req, res) => {
  let json = ''

  req.on('data', chunk => {
    json += chunk
  })

  req.on('end', () => {
    try {
      const { postId } = req.params
      const { userId, price } = JSON.parse(json)

      sellPost(userId, postId, price, (error) => {
        if (error) {
        res.status(400).json({ error: error.message })
        
        return
        }
        
        res.status(204).send()
      })

    } catch(error) {
      res.status(400).json({ error: error.message})
    }
  })
})

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
//escuchamos el puerto (server) que le enviamos desde .env

//en consola "npm run start" (node .) (para arrancarlo) y vamos en el navegador a la ruta localhost:4321 (4321 porque es el que hemos configurado en el .env)