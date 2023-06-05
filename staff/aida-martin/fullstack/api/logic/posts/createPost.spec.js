const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const createPost = require('./createPost')

describe('createPost', () => {
  beforeEach(done => writeFile('./data/posts.json', '[]', 'utf8', error => done(error)))

  it('should succeed on create new post', done => {
    const id = `id-${Math.random()}`
    const email = `e-${Math.random()}@gmail.com`

    const users = [{ id, email }]
    const json = JSON.stringify(users)

    writeFile('./data/users.json', json, 'utf8', error => {
      expect(error).to.be.null

      readFile('./data/users.json', 'utf8', (error, json) => {
        expect(error).to.be.null

        const users = JSON.parse(json)

        const user = users.find(user => user.email === email)

       const image = `url-${Math.random()}`
       const text = `text-${Math.random()}`

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
  })

  it('should fail on not existing user', done => {
    const image = `url-${Math.random()}`
    const text = `text-${Math.random()}`
    const fakeId = `id-${Math.random()}`


     createPost(fakeId, image, text, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found! 😥')

              done()
          })

          after(done => writeFile('./data/posts.json', '[]', 'utf8', error => done(error)))
      })