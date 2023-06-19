require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const updatePost = require('./updatePost')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('updatePost', () => {
  let user, user2, post, image2, text2

  beforeEach((done) => {
    user = generate.user()
    user2 = generate.user()
    post = generate.post(user.id)
    image2 = `image-${Math.random()}`
    text2 = `text-${Math.random()}`

    cleanUp(done)
  })

  it('should succeed on update post', (done) => {
    const users = [user]
    const posts = [post]

    populate(users, posts, (error) => {
      if (error) {
        done(error)

        return
      }

      updatePost(user.id, post.id, image2, text2, (error) => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, json) => {
          expect(error).to.be.null

          const [{ image, text }] = JSON.parse(json)

          expect(image).to.equal(image2)
          expect(text).to.equal(text2)

          done()
        })
      })
    })
  })

  it('should fail on not existing user', (done) => {
    updatePost(user.id, post.id, image2, text2, (error) => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')

      done()
    })
  })

  it('should fail on not existing post', (done) => {
    const users = [user]

    populate(users, [], (error) => {
      if (error) {
        done(error)

        return
      }

      updatePost(user.id, post.id, image2, text2, (error, post) => {
        expect(error).to.be.instanceOf(Error)

        expect(post).to.be.undefined
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

      updatePost(user2.id, post.id, image2, text2, (error) => {
        expect(error).to.be.instanceOf(Error)

        expect(error.message).to.equal(
          `Post with ID ${post.id} does not belong to user with ID ${user2.id} 😥`
        )

        done()
      })
    })
  })

  it('fails on non-string user id', () => {
    expect(() =>
      updatePost(undefined, post.id, image2, text2, () => {})
    ).to.throw(Error, 'User ID is not a string 😥')
    expect(() => updatePost(1, post.id, image2, text2, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => updatePost(true, post.id, image2, text2, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => updatePost({}, post.id, image2, text2, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
    expect(() => updatePost([], post.id, image2, text2, () => {})).to.throw(
      Error,
      'User ID is not a string 😥'
    )
  })

  it('fails on empty user id', () => {
    expect(() => updatePost('', post.id, image2, text2, () => {})).to.throw(
      Error,
      'User ID is empty 😥'
    )
  })

  it('fails on non-string post id', () => {
    expect(() =>
      updatePost(user.id, undefined, image2, text2, () => {})
    ).to.throw(Error, 'Post ID is not a string 😥')
    expect(() => updatePost(user.id, 1, image2, text2, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => updatePost(user.id, true, image2, text2, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => updatePost(user.id, {}, image2, text2, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
    expect(() => updatePost(user.id, [], image2, text2, () => {})).to.throw(
      Error,
      'Post ID is not a string 😥'
    )
  })

  it('fails on empty post id', () => {
    expect(() => updatePost(user.id, '', image2, text2, () => {})).to.throw(
      Error,
      'Post ID is empty 😥'
    )
  })

  it('fails on non-string image url', () => {
    expect(() =>
      updatePost(user.id, post.id, undefined, text2, () => {})
    ).to.throw(Error, 'Image URL is not a string 😥')
    expect(() => updatePost(user.id, post.id, 1, text2, () => {})).to.throw(
      Error,
      'Image URL is not a string 😥'
    )
    expect(() => updatePost(user.id, post.id, true, text2, () => {})).to.throw(
      Error,
      'Image URL is not a string 😥'
    )
    expect(() => updatePost(user.id, post.id, {}, text2, () => {})).to.throw(
      Error,
      'Image URL is not a string 😥'
    )
    expect(() => updatePost(user.id, post.id, [], text2, () => {})).to.throw(
      Error,
      'Image URL is not a string 😥'
    )
  })

  it('fails on empty image url', () => {
    expect(() => updatePost(user.id, post.id, '', text2, () => {})).to.throw(
      Error,
      'Image URL is empty 😥'
    )
  })

  it('fails on non-string text', () => {
    expect(() =>
      updatePost(user.id, post.id, image2, undefined, () => {})
    ).to.throw(Error, 'Text is not a string 😥')
    expect(() => updatePost(user.id, post.id, image2, 1, () => {})).to.throw(
      Error,
      'Text is not a string 😥'
    )
    expect(() => updatePost(user.id, post.id, image2, true, () => {})).to.throw(
      Error,
      'Text is not a string 😥'
    )
    expect(() => updatePost(user.id, post.id, image2, {}, () => {})).to.throw(
      Error,
      'Text is not a string 😥'
    )
    expect(() => updatePost(user.id, post.id, image2, [], () => {})).to.throw(
      Error,
      'Text is not a string 😥'
    )
  })

  it('fails on empty text', () => {
    expect(() => updatePost(user.id, post.id, image2, '', () => {})).to.throw(
      Error,
      'Text is empty 😥'
    )
  })

  it('fails on non-function callback', () => {
    expect(() =>
      updatePost(user.id, post.id, image2, text2, 'callback')
    ).to.throw(Error, 'Callback is not a function 😥')
    expect(() => updatePost(user.id, post.id, image2, text2)).to.throw(
      Error,
      'Callback is not a function 😥'
    )
  })

  after(cleanUp)
})
