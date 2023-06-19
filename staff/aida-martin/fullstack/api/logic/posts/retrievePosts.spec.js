require('dotenv').config()

const { expect } = require('chai')
const retrievePosts = require('./retrievePosts')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('retrievePosts', () => {
  beforeEach(cleanUp)

  describe('on existing users and posts', () => {
    const users = new Array(5),
      posts = []

    beforeEach((done) => {
      for (let i = 0; i < users.length; i++) {
        const user = generate.user()

        users[i] = user

        for (let j = 0; j < 1; j++) {
          const post = generate.post(user.id)

          posts.push(post)
        }
      }

      populate(users, posts, done)
    })

    it('should succeed on retrieve posts', (done) => {
      const user = users[0]

      const publicPosts = posts.filter(
        (post) => post.visibility === 'public' || user.id === post.author
      )

      publicPosts.forEach((post) => {
        post.saves = user.saves.includes(post.id)

        const _user = users.find((_user) => _user.id === post.author)

        post.author = {
          id: _user.id,
          name: _user.name.split(' ')[0],
          avatar: _user.avatar,
        }

        post.date = post.date.toISOString()
      })

      retrievePosts(user.id, (error, _posts) => {
        expect(error).to.be.null

        expect(_posts).to.deep.equal(publicPosts.reverse())

        done()
      })
    })

    it('should fail on wrong id', (done) => {
      retrievePosts('wrongId', (error, _posts) => {
        expect(error).to.be.instanceOf(Error)

        expect(_posts).to.be.undefined
        expect(error.message).to.equal('User not found! 😥')

        done()
      })
    })

    it('fails on non-string user id', () => {
      expect(() => retrievePosts(undefined, () => {})).to.throw(
        Error,
        'User ID is not a string 😥'
      )
      expect(() => retrievePosts(1)).to.throw(
        Error,
        'User ID is not a string 😥'
      )
      expect(() => retrievePosts(true)).to.throw(
        Error,
        'User ID is not a string 😥'
      )
      expect(() => retrievePosts({})).to.throw(
        Error,
        'User ID is not a string 😥'
      )
      expect(() => retrievePosts([])).to.throw(
        Error,
        'User ID is not a string 😥'
      )
    })

    it('fails on empty user id', () => {
      expect(() => retrievePosts('')).to.throw(Error, 'User ID is empty 😥')
    })

    it('fails on non-function callback', () => {
      const user = users[0]

      expect(() => retrievePosts(user.id, 'callback')).to.throw(
        Error,
        'Callback is not a function 😥'
      )
      expect(() => retrievePosts(user.id)).to.throw(
        Error,
        'Callback is not a function 😥'
      )
    })
  })

  it('should fail on non-existing user', (done) => {
    retrievePosts(`wrongId`, (error, _posts) => {
      expect(error).to.be.instanceOf(Error)

      expect(_posts).to.be.undefined
      expect(error.message).to.equal('User not found! 😥')

      done()
    })
  })

  after(cleanUp)
})
