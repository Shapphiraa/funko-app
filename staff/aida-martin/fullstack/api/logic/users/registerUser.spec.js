const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')

describe('registerUser', () => {
  beforeEach(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

  it('should succeed on new user', done => {
      const name = `name-${Math.random()}`
      const email = `e-${Math.random()}@gmail.com`
      const password = `password-${Math.random()}`
      const repeatPassword = password

      registerUser(name, email, password, repeatPassword, error => {
          expect(error).to.be.null

          readFile('./data/users.json', 'utf8', (error, json) => {
              expect(error).to.be.null

              const users = JSON.parse(json)

              const user = users.find(user => user.email === email)

              expect(user).to.exist
              expect(user.id).to.be.a('string')
              expect(user.name).to.equal(name)
              expect(user.email).to.equal(email)
              expect(user.password).to.equal(password)
              expect(user.avatar).to.be.null
              expect(user.saves).to.have.lengthOf(0)

              done()
          })
      })
  })

  //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (USUARIO YA REGISTRADO):

  it('should fail on existing user', done => {
      const name = `name-${Math.random()}`
      const email = `e-${Math.random()}@gmail.com`
      const password = `password-${Math.random()}`
      const repeatPassword = password

      const users = [{ name, email, password }]
      const json = JSON.stringify(users)

      writeFile('./data/users.json', json, 'utf8', error => {
          expect(error).to.be.null

          registerUser(name, email, password, repeatPassword, error => {
              expect(error).to.be.instanceOf(Error)
              expect(error.message).to.equal('You are already registered! Please login! 😅')

              done()
          })
      })
  })
  
   //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (CONTRASEÑAS NO COINCIDEN):

  it('should fail on password and repeatPassword does not match', done => {
    const name = `name-${Math.random()}`
    const email = `e-${Math.random()}@gmail.com`
    const password = `password-${Math.random()}`
    const repeatPassword = `repeatPassword-${Math.random()}`

        registerUser(name, email, password, repeatPassword, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('Passwords does not match 😢')

            done()
        })
})

  //LIMPIAR LA BASE DE DATOS DESPUÉS:
  after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})