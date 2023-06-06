const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updatePost = require('./updatePost')

describe('updatePost', () => {
  let userId, postId, image, text, image2, text2
  
  beforeEach(done => {
    userId = `id-${Math.random()}`
    postId = `post-${Math.random()}`
    image = `url-${Math.random()}`
    text = `text-${Math.random()}`
    image2 = `url-${Math.random()}`
    text2 = `text-${Math.random()}`
    
    writeFile('./data/posts.json', '[]', 'utf8', error => done(error))
  })

  it('should succeed on update post', done => {
    const users = [{ id: userId }]
    const usersJson = JSON.stringify(users)

    writeFile('./data/users.json', usersJson, 'utf8', error => {
      expect(error).to.be.null

      readFile('./data/users.json', 'utf8', (error, json) => {
        expect(error).to.be.null

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId )

        const posts = [{ id: postId, author: userId, image: image, text: text }]

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
     updatePost(`id-${Math.random()}`, `post-${Math.random()}`, image2, text2, (error, post) => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found! 😥')
  
              done()
          })
      })

      it('should fail on not existing post', done => {
        const users = [{ id: userId }]
        const usersJson = JSON.stringify(users)
    
        writeFile('./data/users.json', usersJson, 'utf8', error => {
          expect(error).to.be.null
    
          readFile('./data/users.json', 'utf8', (error, json) => {
            expect(error).to.be.null
    
            const users = JSON.parse(json)
    
            const user = users.find(user => user.id === userId )

          updatePost(user.id, `post-${Math.random()}`, image2, text2, (error, post) => {
            expect(error).to.be.instanceOf(Error)

            expect(post).to.be.undefined
            expect(error.message).to.equal('Post not found! 😥')
    
                  done()
              })
          })
        })
      })
    })
