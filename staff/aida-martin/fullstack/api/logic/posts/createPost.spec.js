require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const createPost = require('./createPost')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('createPost', () => {
  let user, user2, image, text, post

  beforeEach((done) => {
    user = generate.user()
    user2 = generate.user()
    post = generate.post(user2.id)
    image = `image-${Math.random()}`
    text = `text-${Math.random()}`

    cleanUp(done)
  })

  it('should succeed on create new post', (done) => {
    const users = [user]

    post.id = 'post-1'
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      createPost(user.id, image, text, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, json) => {
          expect(error).to.be.null

          const posts = JSON.parse(json)

          const _post = posts.find((_post) => _post.author === user.id)

          expect(_post).to.exist
          expect(_post.id).to.be.a('string')

          const lastPost = posts[posts.length - 1]

          if (lastPost) {
            expect(_post.id).to.equal(`post-${parseInt(lastPost.id.slice(5))}`)
          } else {
            expect(_post.id).to.equal('post-1')
          }

          expect(_post.author).to.equal(user.id)
          expect(_post.image).to.equal(image)
          expect(_post.text).to.equal(text)
          expect(_post.date).to.be.a('string')
          expect(_post.likes).to.have.lengthOf(0)
          expect(_post.visibility).to.equal('public')
          expect(_post.price).to.equal(0)

          done()
        })
      })
    })
  })

  it('should fail on not existing user', (done) => {
    createPost(user.id, image, text, (error) => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')

      done()
    })
  })

  it('fails on non-string id', () => {
    expect(() => createPost(undefined, image, text, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => createPost(1, image, text, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => createPost(true, image, text, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => createPost({}, image, text, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => createPost([], image, text, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
  })

  it('fails on empty id', () => {
    expect(() => createPost('', image, text, () => {})).to.throw(
      Error,
      'User ID is empty 😥'
    )
  })

  it('fails on non-string url image', () => {
    expect(() => createPost(user.id, undefined, text, () => {})).to.throw(
      Error,
      'Image URL is not a string 😥'
    )
    expect(() => createPost(user.id, 1, text, () => {})).to.throw(
      Error,
      'Image URL is not a string 😥'
    )
    expect(() => createPost(user.id, true, text, () => {})).to.throw(
      Error,
      'Image URL is not a string 😥'
    )
    expect(() => createPost(user.id, {}, text, () => {})).to.throw(
      Error,
      'Image URL is not a string 😥'
    )
    expect(() => createPost(user.id, [], text, () => {})).to.throw(
      Error,
      'Image URL is not a string 😥'
    )
  })

  it('fails on empty url image', () => {
    expect(() => createPost(user.id, '', text, () => {})).to.throw(
      Error,
      'Image URL is empty 😥'
    )
  })

  it('fails on non-string text', () => {
    expect(() => createPost(user.id, image, undefined, () => {})).to.throw(
      Error,
      'Text is not a string 😥'
    )
    expect(() => createPost(user.id, image, 1, () => {})).to.throw(
      Error,
      'Text is not a string 😥'
    )
    expect(() => createPost(user.id, image, true, () => {})).to.throw(
      Error,
      'Text is not a string 😥'
    )
    expect(() => createPost(user.id, image, {}, () => {})).to.throw(
      Error,
      'Text is not a string 😥'
    )
    expect(() => createPost(user.id, image, [], () => {})).to.throw(
      Error,
      'Text is not a string 😥'
    )
  })

  it('fails on empty text', () => {
    expect(() => createPost(user.id, image, '', () => {})).to.throw(
      Error,
      'Text is empty 😥'
    )
  })

  it('fails on non-function callback', () => {
    expect(() => createPost(user.id, image, text, 'callback')).to.throw(
      Error,
      'Callback is not a function 😥'
    )
    expect(() => createPost(user.id, image, text)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })

  after(cleanUp)
})
