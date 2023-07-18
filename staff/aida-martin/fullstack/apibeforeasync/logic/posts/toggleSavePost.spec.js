require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const toggleSavePost = require('./toggleSavePost')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('toggleSavePost', () => {
  let user, post

  beforeEach((done) => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it('should succeed on saved post', (done) => {
    const users = [user]
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      toggleSavePost(user.id, post.id, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
          expect(error).to.be.null

          const users = JSON.parse(json)

          const _user = users.find((_user) => _user.id === user.id)

          expect(_user.saves[0]).to.be.equal(post.id)

          done()
        })
      })
    })
  })

  it('should succeed on unsaved post', (done) => {
    const posts = [post]

    user.saves = [post.id]
    const users = [user]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      toggleSavePost(user.id, post.id, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
          expect(error).to.be.null

          const users = JSON.parse(json)

          const _user = users.find((_user) => _user.id === user.id)

          expect(_user.saves).to.be.lengthOf(0)

          done()
        })
      })
    })
  })

  it('should fail on non-existing user', (done) => {
    toggleSavePost(user.id, post.id, (error) => {
      expect(error).to.be.instanceOf(Error)

      expect(error.message).to.equal('User not found! 😥')

      done()
    })
  })

  it('should fail on non-existing post', (done) => {
    const users = [user]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      toggleSavePost(user.id, post.id, (error) => {
        expect(error).to.be.instanceOf(Error)

        expect(error.message).to.equal('Post not found! 😥')

        done()
      })
    })
  })

  it('fails on non-string user id', () => {
    expect(() => toggleSavePost(undefined, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => toggleSavePost(1, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => toggleSavePost(true, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => toggleSavePost({}, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => toggleSavePost([], post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
  })

  it('fails on empty user id', () => {
    expect(() => toggleSavePost('', post.id, () => {})).to.throw(
      Error,
      'User ID is empty 😥'
    )
  })

  it('fails on non-string post id', () => {
    expect(() => toggleSavePost(user.id, undefined, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => toggleSavePost(user.id, 1, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => toggleSavePost(user.id, true, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => toggleSavePost(user.id, {}, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => toggleSavePost(user.id, [], () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
  })

  it('fails on empty post id', () => {
    expect(() => toggleSavePost(user.id, '', () => {})).to.throw(
      Error,
      'Post ID is empty 😥'
    )
  })

  it('fails on non-function callback', () => {
    expect(() => toggleSavePost(user.id, post.id, 'callback')).to.throw(
      Error,
      'Callback is not a function 😥'
    )
    expect(() => toggleSavePost(user.id, post.id)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })

  after(cleanUp)
})
