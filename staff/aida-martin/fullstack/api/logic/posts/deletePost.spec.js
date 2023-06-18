require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const deletePost = require('./deletePost')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('deletePost', () => {
  let user, user2, post

  beforeEach((done) => {
    user = generate.user()
    user2 = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it('should succeed on delete post', (done) => {
    const users = [user]
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      deletePost(user.id, post.id, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, json) => {
          expect(error).to.be.null

          const posts = JSON.parse(json)

          const _post = posts.find((_post) => _post.id === post.id)

          expect(_post).to.be.undefined
          console.log('algo')

          done()
        })
      })
    })
  })

  it('should fail on non-existing user', (done) => {
    deletePost(user.id, post.id, (error) => {
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

      deletePost(user.id, post.id, (error) => {
        expect(error).to.be.instanceOf(Error)

        expect(error.message).to.equal('Post not found! 😥')

        done()
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

      deletePost(user2.id, post.id, (error) => {
        expect(error).to.be.instanceOf(Error)

        expect(error.message).to.equal(
          `Post with ID ${post.id} does not belong to user with ID ${user2.id} 😥`
        )

        done()
      })
    })
  })

  it('fails on non-string user id', () => {
    expect(() => deletePost(undefined, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => deletePost(1, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => deletePost(true, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => deletePost({}, post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => deletePost([], post.id, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
  })

  it('fails on empty user id', () => {
    expect(() => deletePost('', post.id, () => {})).to.throw(
      Error,
      'User ID is empty 😥'
    )
  })

  it('fails on non-string post id', () => {
    expect(() => deletePost(user.id, undefined, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => deletePost(user.id, 1, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => deletePost(user.id, true, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => deletePost(user.id, {}, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => deletePost(user.id, [], () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
  })

  it('fails on empty post id', () => {
    expect(() => deletePost(user.id, '', () => {})).to.throw(
      Error,
      'Post ID is empty 😥'
    )
  })

  it('fails on non-function callback', () => {
    expect(() => deletePost(user.id, post.id, 'callback')).to.throw(
      Error,
      'Callback is not a function 😥'
    )
    expect(() => deletePost(user.id, post.id)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })

  after(cleanUp)
})
