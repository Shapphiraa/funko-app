require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('./authenticateUser')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('authenticateUser', () => {
  let user

  beforeEach((done) => {
    user = generate.user()

    cleanUp(done)
  })

  it('should authenticate the user', (done) => {
    const users = [user]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      authenticateUser(user.email, user.password, (error, userId) => {
        expect(error).to.be.null

        expect(userId).to.equal(user.id)

        done()
      })
    })
  })

  //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (USUARIO NO EXISTE):

  it('should fail on non-existing user', (done) => {
    authenticateUser(user.email, user.password, (error, userId) => {
      expect(error).to.be.instanceOf(Error)

      expect(error.message).to.equal('User not found! 😥')
      expect(userId).to.be.undefined

      done()
    })
  })

  //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (CONTRASEÑAS NO COINCIDEN):

  it('should fail on existing user but wrong password', (done) => {
    const users = [user]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      authenticateUser(
        user.email,
        `wrongPassword-${Math.random()}`,
        (error, userId) => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.equal('Wrong password 😥')
          expect(userId).to.be.undefined

          done()
        }
      )
    })
  })

  it('should fail on existing user but wrong email', (done) => {
    const users = [user]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      user.email += '-wrong'

      authenticateUser(user.email, user.password, (error, userId) => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal(`User not found! 😥`)
        expect(userId).to.be.undefined

        done()
      })
    })
  })

  it('fails on non-string email', () => {
    expect(() => authenticateUser(undefined, user.password, () => {})).to.throw(
      Error,
      'Email is not a string 😥'
    )
    expect(() => authenticateUser(1, user.password, () => {})).to.throw(
      Error,
      'Email is not a string 😥'
    )
    expect(() => authenticateUser(true, user.password, () => {})).to.throw(
      Error,
      'Email is not a string 😥'
    )
    expect(() => authenticateUser({}, user.password, () => {})).to.throw(
      Error,
      'Email is not a string 😥'
    )
    expect(() => authenticateUser([], user.password, () => {})).to.throw(
      Error,
      'Email is not a string 😥'
    )
  })

  it('fails on empty email', () =>
    expect(() => authenticateUser('', user.password, () => {})).to.throw(
      Error,
      'Email is empty 😥'
    ))

  it('fails on not valid email', () =>
    expect(() =>
      authenticateUser('not-valid-email', user.password, () => {})
    ).to.throw(Error, 'Email is not valid 😥'))

  it('fails on non-string password', () => {
    expect(() => authenticateUser(user.email, undefined, () => {})).to.throw(
      Error,
      'Password is not a string 😥'
    )
    expect(() => authenticateUser(user.email, 1, () => {})).to.throw(
      Error,
      'Password is not a string 😥'
    )
    expect(() => authenticateUser(user.email, true, () => {})).to.throw(
      Error,
      'Password is not a string 😥'
    )
    expect(() => authenticateUser(user.email, {}, () => {})).to.throw(
      Error,
      'Password is not a string 😥'
    )
    expect(() => authenticateUser(user.email, [], () => {})).to.throw(
      Error,
      'Password is not a string 😥'
    )
  })

  it('fails on password not have 8 characters', () =>
    expect(() => authenticateUser(user.email, 'pass', () => {})).to.throw(
      Error,
      'Password does not have 8 characters 😥'
    ))

  it('fails on non-function callback', () => {
    expect(() =>
      authenticateUser(user.email, user.password, 'callback')
    ).to.throw(Error, 'Callback is not a function 😥')
    expect(() => authenticateUser(user.email, user.password)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })

  after(cleanUp)
})
