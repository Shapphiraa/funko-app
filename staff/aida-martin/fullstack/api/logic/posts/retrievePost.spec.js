const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const retrievePost = require('./retrievePost')

describe('retrievePost', () => {
  it('should succeed on retrieve post', done => {
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

        const posts = [{ id: postId, author }]
        const postsJson = JSON.stringify(posts)
   
        writeFile('./data/posts.json', postsJson, 'utf8', error => {
         expect(error).to.be.null
   
          retrievePost(user.id, postId, (error, post) => {
            expect(error).to.be.null

            expect(post).to.exist
            expect(post.id).to.be.equal(postId)
            expect(post.author).to.be.equal(user.id)

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

     retrievePost(fakeId, fakePostId, (error, post) => {
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
    
          retrievePost(user.id, fakePostId, (error, post) => {
            expect(error).to.be.instanceOf(Error)

            expect(post).to.be.undefined
            expect(error.message).to.equal('Post not found! 😥')
    
                  done()
              })
          })
        })
      })