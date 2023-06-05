const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const retrievePosts = require('./retrievePosts')

describe('retrievePosts', () => {
  it('should succeed on retrieve posts (of current user and publics)', done => {
    const userId = `id-${Math.random()}`
    const name1 = `name-${Math.random()}`
    const avatar1 = `avatar-${Math.random()}`

    const userId2 = `id-${Math.random()}`
    const name2 = `name-${Math.random()}`
    const avatar2 = `avatar-${Math.random()}`

    const postId1 = `post-${Math.random()}`
    const author1 = userId

    const postId2 = `post-${Math.random()}`
    const author2 = userId2

    const postId3 =`post-${Math.random()}`

    const users = [{ id: userId, name: name1, avatar: avatar1, saves: [postId2] }, { id: userId2, name: name2, avatar: avatar2, saves: []}]
    const usersJson = JSON.stringify(users)

    const posts = [{ id: postId1, author: author1, visibility: 'private' }, { id: postId2, author: author2, visibility: 'public' }, { id: postId3, author: author2, visibility: 'private' }]
    const postsJson = JSON.stringify(posts)

    writeFile('./data/users.json', usersJson, 'utf8', error => {
      expect(error).to.be.null

      readFile('./data/users.json', 'utf8', (error, json) => {
        expect(error).to.be.null

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId )
        const user2 = users.find(user => user.id === userId2 )

        writeFile('./data/posts.json', postsJson, 'utf8', error => {
         expect(error).to.be.null
   
          retrievePosts(user.id, (error, posts) => {
            expect(error).to.be.null

            expect(posts).to.exist
            expect(posts).to.have.lengthOf(2)
            expect(posts[0].author.id).to.be.equal(user.id)
            expect(posts[1].author.id).to.be.equal(user2.id)
            expect(posts[0].saves).to.be.false
            expect(posts[1].saves).to.be.true

            done()
          })

          })
        })
      })
    })
  })

  it('should fail on not existing user', done => {
    const fakeId = `id-${Math.random()}`

     retrievePosts(fakeId, (error, posts) => {
        expect(error).to.be.instanceOf(Error)

        expect(posts).to.be.undefined
        expect(error.message).to.equal('User not found! 😥')

              done()
          })
      })