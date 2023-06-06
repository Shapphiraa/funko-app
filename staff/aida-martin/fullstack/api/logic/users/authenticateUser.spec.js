const { expect } = require('chai')
const { writeFile } = require('fs')
const authenticateUser = require('./authenticateUser')

describe('authenticateUser', () => {
  it('should authenticate the user', done => {
      const email = `e-${Math.random()}@gmail.com`
      const password = `password-${Math.random()}`

      const users = [{ email, password }]
      const json = JSON.stringify(users)

      writeFile('./data/users.json', json, 'utf8', error => {
        expect(error).to.be.null

        authenticateUser(email, password, error => {
            expect(error).to.be.null

            //Esto no hace falta tampoco porque no tengo que validar si el usuario existe...
            // const users = JSON.parse(json)

            // const user = users.find(user => user.email === email)

            expect(user).to.exist
            // expect(user.email).to.equal(email)
            // expect(user.password).to.equal(password)
            // No son necesarios, pero si tengo que meter el id!!!

            done()
        })
      })
  })

  //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (USUARIO NO EXISTE):

  it('should fail on not existing user', done => {
      const email = `e-${Math.random()}@gmail.com`
      const password = `password-${Math.random()}`


        authenticateUser(email, password, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('User not found! 😥')

              done()
          })
      })
  })
  
   //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (CONTRASEÑAS NO COINCIDEN):

   it('should fail on wrong password', done => {
    const email = `e-${Math.random()}@gmail.com`
    const password = `password-${Math.random()}`
    const wrongPassword = `wrongPassword-${Math.random()}`

    const users = [{ email, password }]
    const json = JSON.stringify(users)

    writeFile('./data/users.json', json, 'utf8', error => {
      expect(error).to.be.null

      authenticateUser(email, wrongPassword, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Wrong password 😥')

        done()
      })
    })

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})