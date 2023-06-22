require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const buyPost = require('./buyPost')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('buyPost', () => {
  let user, user2, post

  beforeEach((done) => {
    user = generate.user()
    user2 = generate.user()
    post = generate.post(user2.id)

    cleanUp(done)
  })

  it('should succeed on buy post', (done) => {
    const users = [user, user2]

    post.price = Math.round(Math.random() * 1)
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      buyPost(user.id, post.id, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null

          const [{ author, price }] = JSON.parse(json)

          expect(author).to.be.equal(user.id)
          expect(price).to.be.equal(0)

          done()
        })
      })
    })
  })

  it('should fail on non-existing user', (done) => {
    buyPost(user.id, post.id, (error) => {
      expect(error).to.be.instanceOf(Error)

      expect(error.message).to.equal('User not found! 😥')

      done()
    })
  })

  it('should fail on non-existing post', (done) => {
    const users = [user, user2]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      buyPost(user.id, post.id, (error) => {
        expect(error).to.be.instanceOf(Error)

        expect(error.message).to.equal('Post not found! 😥')

        done()
      })
    })
  })

  it('fails on non-string user id', () => {
    expect(() => buyPost(undefined, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => buyPost(1, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => buyPost(true, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => buyPost({}, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => buyPost([], post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
  })

  it('fails on empty user id', () => {
    expect(() => buyPost('', post.id, () => {})).to.throw(
      Error,
      'User ID is empty 😥'
    )
  })

  it('fails on non-string post id', () => {
    expect(() => buyPost(user.id, undefined, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => buyPost(user.id, 1, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => buyPost(user.id, true, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => buyPost(user.id, {}, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => buyPost(user.id, [], () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
  })

  it('fails on empty post id', () => {
    expect(() => buyPost(user.id, '', () => {})).to.throw(
      Error,
      'Post ID is empty 😥'
    )
  })

  it('fails on non-function callback', () => {
    expect(() => buyPost(user.id, post.id, 'callback')).to.throw(
      Error,
      'Callback is not a function 😥'
    )
    expect(() => buyPost(user.id, post.id)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })

  after(cleanUp)
})
