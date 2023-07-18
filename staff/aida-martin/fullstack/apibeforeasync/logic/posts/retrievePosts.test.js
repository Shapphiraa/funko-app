const retrievePosts = require('./retrievePosts')

retrievePosts('user-1', (error, posts) => {
  if (error) {
    console.error(error)

    return
  }

  console.log(posts)
})
