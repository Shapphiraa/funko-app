const updateUserAvatar = require('./updateUserAvatar')

updateUserAvatar(
  'user-1',
  'https://cdn-icons-png.flaticon.com/512/219/219989.png',
  (error) => {
    if (error) {
      console.error(error)

      return
    }
    console.log('Avatar updated!')
  }
)
