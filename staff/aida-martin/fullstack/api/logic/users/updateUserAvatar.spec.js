require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updateUserAvatar = require('./updateUserAvatar')

describe('updateUserAvatar', () => {
  let id, avatar, url

  beforeEach(done => {

    id = `user-${Math.random()}`
    avatar = null
    url = `url-${Math.random()}`

    writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
  })

  it('should succeed on update user avatar', done => {
    const users = [{ id, avatar }]
    const json = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
      expect(error).to.be.null

      updateUserAvatar(id, url, error => {
          expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
          expect(error).to.be.null

          // const users = JSON.parse(json)

          // const user = users.find(user => user.id === id)

          //No necesitamos comprobar el usuario. Y destructuramos:

          const [{avatar}] = JSON.parse(json)

          expect(avatar).to.equal(url)

          done()
        })
      })
    })
  })

  it('should fail on not existing user', done => {
      updateUserAvatar(id, url, error => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.equal('User not found! 😥')

            done()
        })
    })
})