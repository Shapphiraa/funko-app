require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const createPost = require('./createPost')
const { cleanUp, populate, generate } = require('../helpers/tests')

describe('createPost', () => {
  let user, image, text
  
  beforeEach(done => {
    user = generate.user()
    image = `image-${Math.random()}`
    text = `text-${Math.random()}`

    cleanUp(done)
    })

  it('should succeed on create new post', done => {
    const users = [user]

    populate(users, [], error => {
      if (error) {
          done(error)

          return
      }

        createPost(user.id, image, text, error => {
         expect(error).to.be.null

         readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, json) => {
            expect(error).to.be.null

            const posts = JSON.parse(json)

            const post = posts.find(post => post.author === user.id)

            expect(post).to.exist
            expect(post.id).to.be.a('string')
            expect(post.author).to.equal(user.id)
            expect(post.image).to.equal(image)
            expect(post.text).to.equal(text)
            expect(post.date).to.be.a('string')
            expect(post.likes).to.have.lengthOf(0)
            expect(post.visibility).to.equal('public')
            expect(post.price).to.equal(0)

            done()
          })

          })
        })
      })

  it('should fail on not existing user', done => {
     createPost(user.id, image, text, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found! 😥')

              done()
          })
      })

  it('fails on non-string id', () => {
      expect(() => createPost(undefined, image, text, () => { })).to.throw(Error, 'User ID is not a string 😥')
      expect(() => createPost(1, image, text, () => { })).to.throw(Error, 'User ID is not a string 😥')
      expect(() => createPost(true, image, text,() => { })).to.throw(Error, 'User ID is not a string 😥')
      expect(() => createPost({}, image, text,() => { })).to.throw(Error, 'User ID is not a string 😥')
      expect(() => createPost([], image, text,() => { })).to.throw(Error, 'User ID is not a string 😥')
  })
    
  it('fails on empty id', () => {
     expect(() => createPost('', image, text, () => { })).to.throw(Error, 'User ID is empty 😥')
 })

  it('fails on non-string url image', () => {
    expect(() => createPost(user.id, undefined, text, () => { })).to.throw(Error, 'Image URL is not a string 😥')
    expect(() => createPost(user.id, 1, text, () => { })).to.throw(Error, 'Image URL is not a string 😥')
    expect(() => createPost(user.id, true, text, () => { })).to.throw(Error, 'Image URL is not a string 😥')
    expect(() => createPost(user.id, {}, text, () => { })).to.throw(Error, 'Image URL is not a string 😥')
    expect(() => createPost(user.id, [], text, () => { })).to.throw(Error, 'Image URL is not a string 😥')
})
    
    it('fails on empty url image', () => {
        expect(() => createPost(user.id, '', text, () => { })).to.throw(Error, 'Image URL is empty 😥')
    })

    it('fails on non-string text', () => {
      expect(() => createPost(user.id, image, undefined,() => { })).to.throw(Error, 'Text is not a string 😥')
      expect(() => createPost(user.id, image, 1, () => { })).to.throw(Error, 'Text is not a string 😥')
      expect(() => createPost(user.id, image, true, () => { })).to.throw(Error, 'Text is not a string 😥')
      expect(() => createPost(user.id, image, {}, () => { })).to.throw(Error, 'Text is not a string 😥')
      expect(() => createPost(user.id, image, [], () => { })).to.throw(Error, 'Text is not a string 😥')
  })
  
  it('fails on empty text', () => {
      expect(() => createPost(user.id, image, '', () => { })).to.throw(Error, 'Text is empty 😥')
  })

  it('fails on non-function callback', () => {
    expect(() => createPost(user.id, image, text, 'callback')).to.throw(Error, 'Callback is not a function 😥')
    expect(() => createPost(user.id, image, text)).to.throw(Error, 'Callback is not a function 😥')
  })

      after(cleanUp)
    })