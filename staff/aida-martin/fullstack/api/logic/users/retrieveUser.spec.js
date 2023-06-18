require('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('./retrieveUser')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('retrieveUser', () => {
  let user

  beforeEach((done) => {
    user = generate.user()

    cleanUp(done)
  })

  it('should succeed on retrieve user (existing user and correct id)', (done) => {
    const users = [user]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      retrieveUser(user.id, (error, _user) => {
        expect(error).to.be.null

        expect(_user).to.exist
        expect(_user.name).to.equal(user.name.split(' ')[0])
        expect(_user.avatar).to.equal(user.avatar)

        done()
      })
    })
  })

  it('should fail on existing user and incorrect id', (done) => {
    const users = [user]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      user.id += '-wrong'

      retrieveUser(user.id, (error, user) => {
        expect(error).to.be.instanceOf(Error)

        expect(error.message).to.equal('User not found! 😥')
        expect(user).to.be.undefined

        done()
      })
    })
  })

  it('should fail on not existing user', (done) => {
    retrieveUser(user.id, (error, user) => {
      expect(error).to.be.instanceOf(Error)

      expect(user).to.be.undefined
      expect(error.message).to.equal('User not found! 😥')

      done()
    })
  })

  it('fails on non-string id', () => {
    expect(() => retrieveUser(undefined, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => retrieveUser(1, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => retrieveUser(true, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => retrieveUser({}, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => retrieveUser([], () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
  })

  it('fails on empty id', () => {
    expect(() => retrieveUser('', () => {})).to.throw(
      Error,
      'User ID is empty 😥'
    )
  })

  it('fails on non-function callback', () => {
    expect(() => retrieveUser(user.id, 'callback')).to.throw(
      Error,
      'Callback is not a function 😥'
    )
    expect(() => retrieveUser(user.id)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })

  after(cleanUp)
})
