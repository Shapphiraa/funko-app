require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const updateUserAvatar = require('./updateUserAvatar')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('updateUserAvatar', () => {
  let user, url

  beforeEach((done) => {
    user = generate.user()
    url = `avatar-${Math.random()}`

    cleanUp(done)
  })

  it('should succeed on update user avatar', (done) => {
    const users = [user]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      updateUserAvatar(user.id, url, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
          expect(error).to.be.null

          const [{ avatar }] = JSON.parse(json)

          expect(avatar).to.equal(url)

          done()
        })
      })
    })
  })

  it('should fail on non-existing user', (done) => {
    updateUserAvatar(user.id, url, (error) => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')

      done()
    })
  })

  it('fails on non-string id', () => {
    expect(() => updateUserAvatar(undefined, url, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => updateUserAvatar(1, url, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => updateUserAvatar(true, url, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => updateUserAvatar({}, url, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => updateUserAvatar([], url, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
  })

  it('fails on empty id', () => {
    expect(() => updateUserAvatar('', url, () => {})).to.throw(
      Error,
      'User ID is empty 😥'
    )
  })

  it('fails on non-string url', () => {
    expect(() => updateUserAvatar(user.id, undefined, () => {})).to.throw(
      Error,
      'Avatar url is not a string 😥'
    )
    expect(() => updateUserAvatar(user.id, 1, () => {})).to.throw(
      Error,
      'Avatar url is not a string 😥'
    )
    expect(() => updateUserAvatar(user.id, true, () => {})).to.throw(
      Error,
      'Avatar url is not a string 😥'
    )
    expect(() => updateUserAvatar(user.id, {}, () => {})).to.throw(
      Error,
      'Avatar url is not a string 😥'
    )
    expect(() => updateUserAvatar(user.id, [], () => {})).to.throw(
      Error,
      'Avatar url is not a string 😥'
    )
  })

  it('fails on empty url', () => {
    expect(() => updateUserAvatar(user.id, '', () => {})).to.throw(
      Error,
      'Avatar url is empty 😥'
    )
  })

  it('fails on non-function callback', () => {
    expect(() => updateUserAvatar(user.id, url, 'callback')).to.throw(
      Error,
      'Callback is not a function 😥'
    )
    expect(() => updateUserAvatar(user.id, url)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })

  after(cleanUp)
})
