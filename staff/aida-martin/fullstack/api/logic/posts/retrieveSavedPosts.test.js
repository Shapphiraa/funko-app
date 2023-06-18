const retrieveSavedPosts = require('./retrieveSavedPosts')

retrieveSavedPosts('user-1', (error, posts) => {
  if (error) {
    console.error(error)

    return
  }

  console.log(posts)
})
