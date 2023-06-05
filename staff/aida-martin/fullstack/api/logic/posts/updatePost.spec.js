const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updatePost = require('./updatePost')

describe('updatePost', () => {
  beforeEach(done => writeFile('./data/posts.json', '[]', 'utf8', error => done(error)))

  it('should succeed on update post', done => {
    const userId = `id-${Math.random()}`

    const users = [{ id: userId }]
    const usersJson = JSON.stringify(users)

    writeFile('./data/users.json', usersJson, 'utf8', error => {
      expect(error).to.be.null

      readFile('./data/users.json', 'utf8', (error, json) => {
        expect(error).to.be.null

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId )

        const postId = `post-${Math.random()}`
        const author = user.id
        const image = `url-${Math.random()}`
        const text = `text-${Math.random()}`

        const image2 = `url-${Math.random()}`
        const text2 = `text-${Math.random()}`

        const posts = [{ id: postId, author, image: image, text: text }]

        const postsJson = JSON.stringify(posts)

        const post = posts.find(post => post.id === postId )
   
        writeFile('./data/posts.json', postsJson, 'utf8', error => {
         expect(error).to.be.null

        updatePost(user.id, post.id, image2, text2, error => {
         expect(error).to.be.null

         readFile('./data/posts.json', 'utf8', (error, json) => {
            expect(error).to.be.null

            const posts = JSON.parse(json)

            const post = posts.find(post => post.author === user.id)

            expect(post).to.exist
            expect(post.image).to.equal(image2)
            expect(post.text).to.equal(text2)

            done()
          })

          })
        })
      })
    })
  })

  it('should fail on not existing user', done => {
    const fakeId = `id-${Math.random()}`
    const fakePostId = `post-${Math.random()}`

    const image2 = `url-${Math.random()}`
    const text2 = `text-${Math.random()}`
  
     updatePost(fakeId, fakePostId, image2, text2, (error, post) => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found! 😥')
  
              done()
          })
      })

      it('should fail on not existing post', done => {
        const userId = `id-${Math.random()}`

        const users = [{ id: userId }]
        const usersJson = JSON.stringify(users)
    
        writeFile('./data/users.json', usersJson, 'utf8', error => {
          expect(error).to.be.null
    
          readFile('./data/users.json', 'utf8', (error, json) => {
            expect(error).to.be.null
    
            const users = JSON.parse(json)
    
            const user = users.find(user => user.id === userId )
  
            const fakePostId = `post-${Math.random()}`
            const image2 = `url-${Math.random()}`
            const text2 = `text-${Math.random()}`
    
          updatePost(user.id, fakePostId, image2, text2, (error, post) => {
            expect(error).to.be.instanceOf(Error)

            expect(post).to.be.undefined
            expect(error.message).to.equal('Post not found! 😥')
    
                  done()
              })
          })
        })
      })
    })
