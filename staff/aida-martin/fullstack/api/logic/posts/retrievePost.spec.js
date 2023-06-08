const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const retrievePost = require('./retrievePost')

describe('retrievePost', () => {
  let userId, postId

  beforeEach(done => {
  userId = `id-${Math.random()}`
  postId = `post-${Math.random()}`

  writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
  })

  it('should succeed on retrieve post', done => {
    const users = [{ id: userId }]
    const usersJson = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, usersJson, 'utf8', error => {
      expect(error).to.be.null

      readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        expect(error).to.be.null

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId )

        const posts = [{ id: postId, author: userId }]
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

  it('should fail on not existing user', done => {
     retrievePost(`id-${Math.random()}`, `post-${Math.random()}`, (error, post) => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found! 😥')

              done()
          })
      })

      it('should fail on not existing post', done => {
        const users = [{ id: userId }]
        const usersJson = JSON.stringify(users)
    
        writeFile(`${process.env.DB_PATH}/users.json`, usersJson, 'utf8', error => {
          expect(error).to.be.null
    
          readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
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
    })