const { expect } = require('chai')
const { writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')

describe('retrieveUser', () => {
  let id, name, avatar

  beforeEach(done => {

    id = `user-${Math.random()}`
    name = `name-${Math.random()}`
    avatar = 'hello'

    writeFile('./data/users.json', '[]', 'utf8', error => done(error))
  })

  it('should succeed on retrieve user', done => {
      const users = [{ id, name, avatar }]
      const json = JSON.stringify(users)

      writeFile('./data/users.json', json, 'utf8', error => {
        expect(error).to.be.null

        retrieveUser(id, (error, user) => {
            expect(error).to.be.null

            expect(user).to.exist
            expect(user.name).to.equal(name.split(' ')[0])
            // expect(user.avatar).to.be.oneOf([null, avatar]) FAIL (cambiado por la línea de abajo, no sé en qué estaba pensando jaja)
            expect(user.avatar).to.equal(avatar)

            done()
        })
      })
    })

    it('should fail on not existing user', done => {
        retrieveUser(id, (error, user) => {
            expect(error).to.be.instanceOf(Error)

            expect(user).to.be.undefined
            expect(error.message).to.equal('User not found! 😥')

              done()
          })
      })

      after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
  })