require('dotenv').config()

const { expect } = require('chai')
const { writeFile } = require('fs')
const authenticateUser = require('./authenticateUser')

describe('authenticateUser', () => {
  let id, email, password
  
  beforeEach(done => {
    id = `id-${Math.random()}` 
    email = `e-${Math.random()}@gmail.com`
    password = `password-${Math.random()}`

    writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
  })

  it('should authenticate the user', done => {
      const users = [{ id, email, password }]
      const json = JSON.stringify(users)

      writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
        expect(error).to.be.null

        authenticateUser(email, password, (error, userId) => {
            expect(error).to.be.null

            expect(userId).to.equal(id)

            done()
        })
      })
  })

  //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (USUARIO NO EXISTE):

  it('should fail on not existing user', done => {
        authenticateUser(email, password, (error, userId) => {

            expect(error).to.be.instanceOf(Error)

            expect(error.message).to.equal('User not found! 😥')
            expect(userId).to.be.undefined

              done()
          })
      })

  
   //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (CONTRASEÑAS NO COINCIDEN):

   it('should fail on wrong password', done => {
    const users = [{ id, email, password }]
    const json = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
      expect(error).to.be.null

      authenticateUser(email, `wrongPassword-${Math.random()}`, (error, userId) => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Wrong password 😥')
        expect(userId).to.be.undefined

        done()
      })
    })
  })

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))
})