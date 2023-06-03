const { expect } = require('chai')
const { writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')

describe('retrieveUser', () => {
  it('should succeed on retrieve user', done => {
      const id = `user-${Math.random()}`
      const name = `name-${Math.random()}`
      const avatar = null

      const users = [{ id, name, avatar }]
      const json = JSON.stringify(users)

      writeFile('./data/users.json', json, 'utf8', error => {
        expect(error).to.be.null

        retrieveUser(id, (error, user) => {
            expect(error).to.be.null

            expect(user).to.exist
            expect(user.name).to.equal(name.split(' ')[0])
            expect(user.avatar).to.be.oneOf([null, user.avatar])

            done()
        })
      })
    })

    it('should fail on not existing user', done => {
      const id = `user-${Math.random()}`

        retrieveUser(id, (error, user) => {
            expect(error).to.be.instanceOf(Error)

            expect(user).to.be.undefined
            expect(error.message).to.equal('User not found! 😥')

              done()
          })
      })

      after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
  })