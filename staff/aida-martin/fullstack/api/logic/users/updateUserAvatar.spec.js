const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updateUserAvatar = require('./updateUserAvatar')

describe('updateUserAvatar', () => {
  it('should succeed on update user avatar', done => {
    const id = `user-${Math.random()}`
    const avatar = null
    const url = 'https://cdn-icons-png.flaticon.com/512/219/219989.png'

    const users = [{ id, avatar }]
    const json = JSON.stringify(users)

    writeFile('./data/users.json', json, 'utf8', error => {
      expect(error).to.be.null

      updateUserAvatar(id, url, error => {
          expect(error).to.be.null

        readFile('./data/users.json', 'utf8', (error, json) => {
          expect(error).to.be.null

          const users = JSON.parse(json)

          const user = users.find(user => user.id === id)

          expect(user).to.exist
          expect(user.avatar).to.equal(url)

          done()
        })
      })
    })
  })

  it('should fail on not existing user', done => {
    const id = `user-${Math.random()}`
    const avatar = null
    const url = 'https://cdn-icons-png.flaticon.com/512/219/219989.png'

      updateUserAvatar(id, url, error => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.equal('User not found! 😥')

            done()
        })
    })
})