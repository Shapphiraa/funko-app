require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const togglePrivatizePost = require('./togglePrivatizePost')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('togglePrivatizePost', () => {
  let user, post

  beforeEach((done) => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it('should succeed on privatized post', (done) => {
    const users = [user]
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      togglePrivatizePost(user.id, post.id, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null

          const posts = JSON.parse(json)

          const _post = posts.find((_post) => _post.id === post.id)

          expect(_post.visibility).to.be.equal('private')

          done()
        })
      })
    })
  })

  it('should succeed on publiced post', (done) => {
    const users = [user]

    post.visibility = 'private'
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      togglePrivatizePost(user.id, post.id, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null

          const posts = JSON.parse(json)

          const _post = posts.find((_post) => _post.id === post.id)

          expect(_post.visibility).to.be.equal('public')

          done()
        })
      })
    })
  })

  it('should fail on non-existing user', (done) => {
    togglePrivatizePost(user.id, post.id, (error) => {
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

      togglePrivatizePost(user.id, post.id, (error) => {
        expect(error).to.be.instanceOf(Error)

        expect(error.message).to.equal('Post not found! 😥')

        done()
      })
    })
  })

  it('fails on non-string user id', () => {
    expect(() => togglePrivatizePost(undefined, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => togglePrivatizePost(1, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => togglePrivatizePost(true, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => togglePrivatizePost({}, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => togglePrivatizePost([], post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
  })

  it('fails on empty user id', () => {
    expect(() => togglePrivatizePost('', post.id, () => {})).to.throw(
      Error,
      'User ID is empty 😥'
    )
  })

  it('fails on non-string post id', () => {
    expect(() => togglePrivatizePost(user.id, undefined, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => togglePrivatizePost(user.id, 1, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => togglePrivatizePost(user.id, true, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => togglePrivatizePost(user.id, {}, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => togglePrivatizePost(user.id, [], () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
  })

  it('fails on empty post id', () => {
    expect(() => togglePrivatizePost(user.id, '', () => {})).to.throw(
      Error,
      'Post ID is empty 😥'
    )
  })

  it('fails on non-function callback', () => {
    expect(() => togglePrivatizePost(user.id, post.id, 'callback')).to.throw(
      Error,
      'Callback is not a function 😥'
    )
    expect(() => togglePrivatizePost(user.id, post.id)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })

  after(cleanUp)
})
