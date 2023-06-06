const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updateUserPassword = require('./updateUserPassword')

describe('updateUserAvatar', () => {
  let id, password, newPassword, newPasswordConfirm

  beforeEach(done => {

    id = `user-${Math.random()}`
    password = `password-${Math.random()}`
    newPassword = `newPassword-${Math.random()}`
    newPasswordConfirm = newPassword

    writeFile('./data/users.json', '[]', 'utf8', error => done(error))
  })

  it('should succeed on update user avatar', done => {
    const users = [{ id, password }]
    const json = JSON.stringify(users)

    writeFile('./data/users.json', json, 'utf8', error => {
      expect(error).to.be.null

      updateUserPassword(id, password, newPassword, newPasswordConfirm, error => {
          expect(error).to.be.null

        readFile('./data/users.json', 'utf8', (error, json) => {
          expect(error).to.be.null

          const users = JSON.parse(json)

          const user = users.find(user => user.id === id)

          expect(user).to.exist
          expect(user.password).to.equal(newPassword)

          done()
        })
      })
    })
  })

  it('should fail on not existing user', done => {
      updateUserPassword(id, password, newPassword, newPasswordConfirm, error => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.equal('User not found! 😥')

            done()
        })
    })

    it('should fail on wrong password', done => {
      const users = [{ id, password }]
      const json = JSON.stringify(users)
  
      writeFile('./data/users.json', json, 'utf8', error => {
        expect(error).to.be.null
  
        updateUserPassword(id, `wrongPassword-${Math.random()}`, newPassword, newPasswordConfirm, error => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.equal('Wrong password 😥')

            done()
        })
      })
  })

  it('should fail on not match new passwords', done => {
      updateUserPassword(id, password, newPassword, 'fail', error => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.equal('New passwords do not match 😥')

            done()
        })
    })

    it('should fail to match the new password with the current one', done => {  
        updateUserPassword(id, password, password, password, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('Your new password matches the current one 😥')
  
              done()
          })
      })
})
