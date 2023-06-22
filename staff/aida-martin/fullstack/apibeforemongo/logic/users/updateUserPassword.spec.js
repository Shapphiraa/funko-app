require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const updateUserPassword = require('./updateUserPassword')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('updateUserPassword', () => {
  let user, newPassword

  beforeEach((done) => {
    user = generate.user()
    newPassword = `newPassword-${Math.random()}`

    cleanUp(done)
  })

  it('should succeed on update user password', (done) => {
    const users = [user]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      updateUserPassword(
        user.id,
        user.password,
        newPassword,
        newPassword,
        (error) => {
          expect(error).to.be.null

          readFile(
            `${process.env.DB_PATH}/users.json`,
            'utf8',
            (error, json) => {
              expect(error).to.be.null

              const [{ password }] = JSON.parse(json)

              expect(password).to.equal(newPassword)

              done()
            }
          )
        }
      )
    })
  })

  it('should fail on not existing user', (done) => {
    updateUserPassword(
      user.id,
      user.password,
      newPassword,
      newPassword,
      (error) => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found! 😥')

        done()
      }
    )
  })

  it('should fail on wrong password', (done) => {
    const users = [user]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      updateUserPassword(
        user.id,
        `wrongPassword-${Math.random()}`,
        newPassword,
        newPassword,
        (error) => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.equal('Wrong password 😥')

          done()
        }
      )
    })
  })

  it('should fail on not match new passwords', () => {
    expect(() =>
      updateUserPassword(
        user.id,
        user.password,
        newPassword,
        'wrongNewPasswordConfirm',
        () => {}
      )
    ).to.throw(Error, 'New passwords do not match 😥')
  })

  it('should fail to match the new password with the current one', () => {
    expect(() =>
      updateUserPassword(
        user.id,
        user.password,
        user.password,
        user.password,
        () => {}
      )
    ).to.throw(Error, 'Your new password matches the current one 😥')
  })

  it('fails on non-string id', () => {
    expect(() =>
      updateUserPassword(
        undefined,
        user.password,
        newPassword,
        newPassword,
        () => {}
      )
    ).to.throw(Error, 'User ID is not a string 😥')
    expect(() =>
      updateUserPassword(1, user.password, newPassword, newPassword, () => {})
    ).to.throw(Error, 'User ID is not a string 😥')
    expect(() =>
      updateUserPassword(
        true,
        user.password,
        newPassword,
        newPassword,
        () => {}
      )
    ).to.throw(Error, 'User ID is not a string 😥')
    expect(() =>
      updateUserPassword({}, user.password, newPassword, newPassword, () => {})
    ).to.throw(Error, 'User ID is not a string 😥')
    expect(() =>
      updateUserPassword([], user.password, newPassword, newPassword, () => {})
    ).to.throw(Error, 'User ID is not a string 😥')
  })

  it('fails on empty id', () => {
    expect(() =>
      updateUserPassword('', user.password, newPassword, newPassword, () => {})
    ).to.throw(Error, 'User ID is empty 😥')
  })

  it('fails on non-string password', () => {
    expect(() =>
      updateUserPassword(user.id, undefined, newPassword, newPassword, () => {})
    ).to.throw(Error, 'Password is not a string 😥')
    expect(() =>
      updateUserPassword(user.id, 1, newPassword, newPassword, () => {})
    ).to.throw(Error, 'Password is not a string 😥')
    expect(() =>
      updateUserPassword(user.id, true, newPassword, newPassword, () => {})
    ).to.throw(Error, 'Password is not a string 😥')
    expect(() =>
      updateUserPassword(user.id, {}, newPassword, newPassword, () => {})
    ).to.throw(Error, 'Password is not a string 😥')
    expect(() =>
      updateUserPassword(user.id, [], newPassword, newPassword, () => {})
    ).to.throw(Error, 'Password is not a string 😥')
  })

  it('fails on password not have 8 characters', () =>
    expect(() =>
      updateUserPassword(user.id, 'pass', newPassword, newPassword, () => {})
    ).to.throw(Error, 'Password does not have 8 characters 😥'))

  it('fails on non-string new password', () => {
    expect(() =>
      updateUserPassword(user.id, user.password, undefined, undefined, () => {})
    ).to.throw(Error, 'New password is not a string 😥')
    expect(() =>
      updateUserPassword(user.id, user.password, 1, 1, () => {})
    ).to.throw(Error, 'New password is not a string 😥')
    expect(() =>
      updateUserPassword(user.id, user.password, true, true, () => {})
    ).to.throw(Error, 'New password is not a string 😥')
    expect(() =>
      updateUserPassword(user.id, user.password, {}, {}, () => {})
    ).to.throw(Error, 'New password is not a string 😥')
    expect(() =>
      updateUserPassword(user.id, user.password, [], [], () => {})
    ).to.throw(Error, 'New password is not a string 😥')
  })

  it('fails on new password not have 8 characters', () =>
    expect(() =>
      updateUserPassword(user.id, user.password, 'pass', 'pass', () => {})
    ).to.throw(Error, 'New password does not have 8 characters 😥'))

  it('fails on non-function callback', () => {
    expect(() =>
      updateUserPassword(
        user.id,
        user.password,
        newPassword,
        newPassword,
        'callback'
      )
    ).to.throw(Error, 'Callback is not a function 😥')
    expect(() =>
      updateUserPassword(user.id, user.password, newPassword, newPassword)
    ).to.throw(Error, 'Callback is not a function 😥')
  })

  after(cleanUp)
})
