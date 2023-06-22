const createPost = require('./createPost')

createPost(
  'user-2',
  'https://picsum.photos/1500?random=2',
  'Hello 💜',
  (error) => {
    if (error) {
      console.error(error)

      return
    }

    console.log('Post created!')
  }
)
