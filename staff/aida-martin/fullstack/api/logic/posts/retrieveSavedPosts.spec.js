const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const retrieveSavedPosts = require('./retrieveSavedPosts')

describe('retrieveSavedPosts', () => {
  let userId, name1, avatar1, userId2, name2, avatar2, postId1, postId2, postId3

  beforeEach(done => {
    userId = `id-${Math.random()}`
    name1 = `name-${Math.random()}`
    avatar1 = `avatar-${Math.random()}`
    userId2 = `id-${Math.random()}`
    name2 = `name-${Math.random()}`
    avatar2 = `avatar-${Math.random()}`
    postId1 = `post-${Math.random()}`
    postId2 = `post-${Math.random()}`
    postId3 =`post-${Math.random()}`

    writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf8', error => done(error))
  })

  it('should succeed on retrieve saved posts of current user', done => {
    const users = [{ id: userId, name: name1, avatar: avatar1, saves: [postId2, postId3] }, { id: userId2, name: name2, avatar: avatar2, saves: []}]
    const usersJson = JSON.stringify(users)

    const posts = [{ id: postId1, author: userId, visibility: 'private' }, { id: postId2, author: userId2, visibility: 'public' }, { id: postId3, author: userId2, visibility: 'private' }]
    const postsJson = JSON.stringify(posts)

    writeFile(`${process.env.DB_PATH}/users.json`, usersJson, 'utf8', error => {
      expect(error).to.be.null

      readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        expect(error).to.be.null

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId )

        writeFile(`${process.env.DB_PATH}/posts.json`, postsJson, 'utf8', error => {
          expect(error).to.be.null
   
          retrieveSavedPosts(user.id, (error, posts) => {
            expect(error).to.be.null

            expect(posts).to.exist
            expect(posts).to.have.lengthOf(1)
            expect(posts[0].id).to.be.equal(user.saves[0])

            done()
          })

        })
      })
    })
  })

  it('should fail on not existing user', done => {
     retrieveSavedPosts(`id-${Math.random()}`, (error, posts) => {
        expect(error).to.be.instanceOf(Error)

        expect(posts).to.be.undefined
        expect(error.message).to.equal('User not found! 😥')

              done()
      })
  })
})