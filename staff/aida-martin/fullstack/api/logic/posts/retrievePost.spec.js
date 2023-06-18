require('dotenv').config()

const { expect } = require('chai')
const retrievePost = require('./retrievePost')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('retrievePost', () => {
  let user, post

  beforeEach((done) => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it('should succeed on retrieve post', (done) => {
    const users = [user]
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      retrievePost(user.id, post.id, (error, _post) => {
        expect(error).to.be.null

        expect(_post).to.exist
        expect(_post.id).to.be.equal(post.id)
        expect(_post.author).to.be.equal(post.author)
        done()
      })
    })
  })

  it('should fail on non-existing user', (done) => {
    retrievePost(user.id, post.id, (error, _post) => {
      expect(error).to.be.instanceOf(Error)

      expect(_post).to.be.undefined
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

      retrievePost(user.id, post.id, (error, _post) => {
        expect(error).to.be.instanceOf(Error)

        expect(_post).to.be.undefined
        expect(error.message).to.equal('Post not found! 😥')

        done()
      })
    })
  })

  it('fails on non-string user id', () => {
    expect(() => retrievePost(undefined, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => retrievePost(1, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => retrievePost(true, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => retrievePost({}, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => retrievePost([], post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
  })

  it('fails on empty user id', () => {
    expect(() => retrievePost('', post.id, () => {})).to.throw(
      Error,
      'User ID is empty 😥'
    )
  })

  it('fails on non-string post id', () => {
    expect(() => retrievePost(user.id, undefined, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => retrievePost(user.id, 1, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => retrievePost(user.id, true, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => retrievePost(user.id, {}, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => retrievePost(user.id, [], () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
  })

  it('fails on empty post id', () => {
    expect(() => retrievePost(user.id, '', () => {})).to.throw(
      Error,
      'Post ID is empty 😥'
    )
  })

  it('fails on non-function callback', () => {
    expect(() => retrievePost(user.id, post.id, 'callback')).to.throw(
      Error,
      'Callback is not a function 😥'
    )
    expect(() => retrievePost(user.id, post.id)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })
  after(cleanUp)
})
