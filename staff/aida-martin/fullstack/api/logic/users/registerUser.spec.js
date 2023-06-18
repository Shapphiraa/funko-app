require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const registerUser = require('./registerUser')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('registerUser', () => {
  let user

  beforeEach((done) => {
    user = generate.user()

    cleanUp(done)
  })

  it('should succeed on new user', (done) => {
    registerUser(
      user.name,
      user.email,
      user.password,
      user.password,
      (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
          expect(error).to.be.null

          const users = JSON.parse(json)

          const _user = users.find((_user) => _user.email === user.email)

          expect(_user).to.exist
          expect(_user.id).to.be.a('string')
          expect(_user.name).to.equal(user.name)
          expect(_user.email).to.equal(user.email)
          expect(_user.password).to.equal(user.password)
          expect(_user.avatar).to.be.null
          expect(_user.saves).to.have.lengthOf(0)

          done()
        })
      }
    )
  })

  it('succeeds on other existing user', (done) => {
    const idCount = Math.round(Math.random() * 100 + 1)
    const id2 = `user-${idCount}`
    const user2 = generate.user()
    user2.id = id2
    const users = [user2]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      registerUser(
        user.name,
        user.email,
        user.password,
        user.password,
        (error) => {
          expect(error).to.be.null

          readFile(
            `${process.env.DB_PATH}/users.json`,
            'utf8',
            (error, json) => {
              expect(error).to.be.null

              const users = JSON.parse(json)

              const _user = users.find((_user) => _user.email === user.email)

              expect(_user).to.exist
              expect(_user.id).to.equal(`user-${idCount + 1}`)
              expect(_user.name).to.equal(user.name)
              expect(_user.email).to.equal(user.email)
              expect(_user.password).to.equal(user.password)
              expect(_user.avatar).to.be.null
              expect(_user.saves).to.have.lengthOf(0)

              done()
            }
          )
        }
      )
    })
  })

  //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (USUARIO YA REGISTRADO):

  it('should fail on existing user', (done) => {
    const users = [user]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      registerUser(
        user.name,
        user.email,
        user.password,
        user.password,
        (error) => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.equal(
            'You are already registered! Please login! 😅'
          )

          done()
        }
      )
    })
  })

  //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (CONTRASEÑAS NO COINCIDEN):

  it('should fail on password and repeatPassword does not match', (done) => {
    const users = [user]

    registerUser(
      user.name,
      user.email,
      user.password,
      `repeatPassword-${Math.random()}`,
      (error) => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Passwords does not match 😢')

        done()
      }
    )
  })

  //VALIDADORES:

  it('fails on non-string email', () => {
    expect(() =>
      registerUser(user.name, undefined, user.password, user.password, () => {})
    ).to.throw(Error, 'Email is not a string 😥')
    expect(() =>
      registerUser(user.name, 1, user.password, user.password, () => {})
    ).to.throw(Error, 'Email is not a string 😥')
    expect(() =>
      registerUser(user.name, true, user.password, user.password, () => {})
    ).to.throw(Error, 'Email is not a string 😥')
    expect(() =>
      registerUser(user.name, {}, user.password, user.password, () => {})
    ).to.throw(Error, 'Email is not a string 😥')
    expect(() =>
      registerUser(user.name, [], user.password, user.password, () => {})
    ).to.throw(Error, 'Email is not a string 😥')
  })

  it('fails on empty email', () =>
    expect(() =>
      registerUser(user.name, '', user.password, user.password, () => {})
    ).to.throw(Error, 'Email is empty 😥'))

  it('fails on not valid email', () =>
    expect(() =>
      registerUser(
        user.name,
        'not-valid-email',
        user.password,
        user.password,
        () => {}
      )
    ).to.throw(Error, 'Email is not valid 😥'))

  it('fails on non-string password', () => {
    expect(() =>
      registerUser(user.name, user.email, undefined, undefined, () => {})
    ).to.throw(Error, 'Password is not a string 😥')
    expect(() => registerUser(user.name, user.email, 1, 1, () => {})).to.throw(
      Error,
      'Password is not a string 😥'
    )
    expect(() =>
      registerUser(user.name, user.email, true, true, () => {})
    ).to.throw(Error, 'Password is not a string 😥')
    expect(() =>
      registerUser(user.name, user.email, {}, {}, () => {})
    ).to.throw(Error, 'Password is not a string 😥')
    expect(() =>
      registerUser(user.name, user.email, [], [], () => {})
    ).to.throw(Error, 'Password is not a string 😥')
  })

  it('fails on password not have 8 characters', () =>
    expect(() =>
      registerUser(user.name, user.email, 'pass', 'pass', () => {})
    ).to.throw(Error, 'Password does not have 8 characters 😥'))

  it('fails on non-string name', () => {
    expect(() =>
      registerUser(
        undefined,
        user.email,
        user.password,
        user.password,
        () => {}
      )
    ).to.throw(Error, 'Name is not a string 😥')
    expect(() =>
      registerUser(1, user.email, user.password, user.password, () => {})
    ).to.throw(Error, 'Name is not a string 😥')
    expect(() =>
      registerUser(true, user.email, user.password, user.password, () => {})
    ).to.throw(Error, 'Name is not a string 😥')
    expect(() =>
      registerUser({}, user.email, user.password, user.password, () => {})
    ).to.throw(Error, 'Name is not a string 😥')
    expect(() =>
      registerUser([], user.email, user.password, user.password, () => {})
    ).to.throw(Error, 'Name is not a string 😥')
  })

  it('fails on empty name', () => {
    expect(() =>
      registerUser('', user.email, user.password, user.password, () => {})
    ).to.throw(Error, 'Name is empty 😥')
  })

  it('fails on non-function callback', () => {
    expect(() =>
      registerUser(
        user.name,
        user.email,
        user.password,
        user.password,
        'callback'
      )
    ).to.throw(Error, 'Callback is not a function 😥')
    expect(() =>
      registerUser(user.name, user.email, user.password, user.password)
    ).to.throw(Error, 'Callback is not a function 😥')
  })

  //LIMPIAR LA BASE DE DATOS DESPUÉS:
  after(cleanUp)
})
