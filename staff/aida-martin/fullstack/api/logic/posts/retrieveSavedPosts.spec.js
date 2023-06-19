require('dotenv').config()

const { expect } = require('chai')
const retrieveSavedPosts = require('./retrieveSavedPosts')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('retrieveSavedPosts', () => {
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

    it('should succeed on retrieve saved posts', (done) => {
      const user = users[0]

      user.saves.push('post-1', 'post-2')

      const publicPosts = posts.filter(
        (post) =>
          (post.visibility === 'public' || user.id === post.author) &&
          user.saves?.includes(post.id)
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

      retrieveSavedPosts(user.id, (error, savedPosts) => {
        expect(error).to.be.null

        expect(savedPosts).to.deep.equal(publicPosts.reverse())

        done()
      })
    })

    it('should fail on wrong id', (done) => {
      retrieveSavedPosts('wrongId', (error, savedPosts) => {
        expect(error).to.be.instanceOf(Error)

        expect(savedPosts).to.be.undefined
        expect(error.message).to.equal('User not found! 😥')

        done()
      })
    })

    it('fails on non-string user id', () => {
      expect(() => retrieveSavedPosts(undefined, () => {})).to.throw(
        Error,
        'User ID is not a string 😥'
      )
      expect(() => retrieveSavedPosts(1)).to.throw(
        Error,
        'User ID is not a string 😥'
      )
      expect(() => retrieveSavedPosts(true)).to.throw(
        Error,
        'User ID is not a string 😥'
      )
      expect(() => retrieveSavedPosts({})).to.throw(
        Error,
        'User ID is not a string 😥'
      )
      expect(() => retrieveSavedPosts([])).to.throw(
        Error,
        'User ID is not a string 😥'
      )
    })

    it('fails on empty user id', () => {
      expect(() => retrieveSavedPosts('')).to.throw(
        Error,
        'User ID is empty 😥'
      )
    })

    it('fails on non-function callback', () => {
      const user = users[0]

      expect(() => retrieveSavedPosts(user.id, 'callback')).to.throw(
        Error,
        'Callback is not a function 😥'
      )
      expect(() => retrieveSavedPosts(user.id)).to.throw(
        Error,
        'Callback is not a function 😥'
      )
    })
  })

  it('should fail on non-existing user', (done) => {
    retrieveSavedPosts(`wrongId`, (error, savedPosts) => {
      expect(error).to.be.instanceOf(Error)

      expect(savedPosts).to.be.undefined
      expect(error.message).to.equal('User not found! 😥')

      done()
    })
  })

  after(cleanUp)
})
