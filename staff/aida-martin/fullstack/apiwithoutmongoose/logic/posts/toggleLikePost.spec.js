require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const toggleLikePost = require('./toggleLikePost')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('toggleLikePost', () => {
  let user, post

  beforeEach((done) => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it('should succeed on liked post', (done) => {
    const users = [user]
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      toggleLikePost(user.id, post.id, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null

          const posts = JSON.parse(json)

          const _post = posts.find((_post) => _post.id === post.id)

          expect(_post.likes[0]).to.be.equal(user.id)

          done()
        })
      })
    })
  })

  it('should succeed on unliked post', (done) => {
    const users = [user]

    post.likes = [user.id]
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      toggleLikePost(user.id, post.id, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null

          const posts = JSON.parse(json)

          const _post = posts.find((_post) => _post.id === post.id)

          expect(_post.likes).to.be.lengthOf(0)

          done()
        })
      })
    })
  })

  it('should fail on non-existing user', (done) => {
    toggleLikePost(user.id, post.id, (error) => {
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

      toggleLikePost(user.id, post.id, (error) => {
        expect(error).to.be.instanceOf(Error)

        expect(error.message).to.equal('Post not found! 😥')

        done()
      })
    })
  })

  it('fails on non-string user id', () => {
    expect(() => toggleLikePost(undefined, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => toggleLikePost(1, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => toggleLikePost(true, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => toggleLikePost({}, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => toggleLikePost([], post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
  })

  it('fails on empty user id', () => {
    expect(() => toggleLikePost('', post.id, () => {})).to.throw(
      Error,
      'User ID is empty 😥'
    )
  })

  it('fails on non-string post id', () => {
    expect(() => toggleLikePost(user.id, undefined, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => toggleLikePost(user.id, 1, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => toggleLikePost(user.id, true, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => toggleLikePost(user.id, {}, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => toggleLikePost(user.id, [], () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
  })

  it('fails on empty post id', () => {
    expect(() => toggleLikePost(user.id, '', () => {})).to.throw(
      Error,
      'Post ID is empty 😥'
    )
  })

  it('fails on non-function callback', () => {
    expect(() => toggleLikePost(user.id, post.id, 'callback')).to.throw(
      Error,
      'Callback is not a function 😥'
    )
    expect(() => toggleLikePost(user.id, post.id)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })

  after(cleanUp)
})
