require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const sellPost = require('./sellPost')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('sellPost', () => {
  let user, user2, post, price2

  beforeEach((done) => {
    user = generate.user()
    user2 = generate.user()
    post = generate.post(user.id)
    price2 = Math.round(Math.random() * 1)

    cleanUp(done)
  })

  it('should succeed on putting the post up for sale', (done) => {
    const users = [user]
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      sellPost(user.id, post.id, price2, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null

          const [{ price }] = JSON.parse(json)

          expect(price).to.be.equal(price2)

          done()
        })
      })
    })
  })

  it('should fail on non-matching post author and user', (done) => {
    const users = [user2]
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      sellPost(user2.id, post.id, price2, (error) => {
        expect(error).to.be.instanceOf(Error)

        expect(error.message).to.equal(
          `Post with ID ${post.id} does not belong to user with ID ${user2.id} 😥`
        )

        done()
      })
    })
  })

  it('should fail on non-existing user', (done) => {
    sellPost(user.id, post.id, price2, (error) => {
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

      sellPost(user.id, post.id, price2, (error) => {
        expect(error).to.be.instanceOf(Error)

        expect(error.message).to.equal('Post not found! 😥')

        done()
      })
    })
  })

  it('fails on non-string user id', () => {
    expect(() => sellPost(undefined, post.id, price2, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => sellPost(1, post.id, price2, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => sellPost(true, post.id, price2, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => sellPost({}, post.id, price2, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => sellPost([], post.id, price2, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
  })

  it('fails on empty user id', () => {
    expect(() => sellPost('', post.id, price2, () => {})).to.throw(
      Error,
      'User ID is empty 😥'
    )
  })

  it('fails on non-string post id', () => {
    expect(() => sellPost(user.id, undefined, price2, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => sellPost(user.id, 1, price2, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => sellPost(user.id, true, price2, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => sellPost(user.id, {}, price2, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => sellPost(user.id, [], price2, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
  })

  it('fails on empty post id', () => {
    expect(() => sellPost(user.id, '', price2, () => {})).to.throw(
      Error,
      'Post ID is empty 😥'
    )
  })

  it('fails on non-function callback', () => {
    expect(() => sellPost(user.id, post.id, price2, 'callback')).to.throw(
      Error,
      'Callback is not a function 😥'
    )
    expect(() => sellPost(user.id, post.id, price2)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })

  after(cleanUp)
})
