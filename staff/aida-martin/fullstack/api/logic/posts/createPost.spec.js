const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const createPost = require('./createPost')

describe('createPost', () => {
  let id, email, image, text
  
  beforeEach(done => {
    id = `id-${Math.random()}`
    email = `e-${Math.random()}@gmail.com`
    image = `url-${Math.random()}`
    text = `text-${Math.random()}`
    
    writeFile('./data/posts.json', '[]', 'utf8', error => done(error))
  })

  it('should succeed on create new post', done => {
    const users = [{ id, email }]
    const json = JSON.stringify(users)

    writeFile('./data/users.json', json, 'utf8', error => {
      expect(error).to.be.null

      readFile('./data/users.json', 'utf8', (error, json) => {
        expect(error).to.be.null

        const users = JSON.parse(json)

        const user = users.find(user => user.email === email)

        createPost(user.id, image, text, error => {
         expect(error).to.be.null

         readFile('./data/posts.json', 'utf8', (error, json) => {
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

            done()
          })

          })
        })
      })
    })

  it('should fail on not existing user', done => {
     createPost(`id-${Math.random()}`, image, text, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found! 😥')

              done()
          })

          after(done => writeFile('./data/posts.json', '[]', 'utf8', error => done(error)))
      })
    })