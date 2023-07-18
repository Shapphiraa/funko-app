const updatePost = require('./updatePost')

updatePost(
  'user-2',
  'post-2',
  'https://picsum.photos/1500?random=3',
  'Hello 💙',
  (error) => {
    if (error) {
      console.error(error)

      return
    }
    console.log('Post updated!')
  }
)
