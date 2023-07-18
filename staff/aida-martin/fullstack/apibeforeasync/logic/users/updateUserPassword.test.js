const updateUserPassword = require('./updateUserPassword')

updateUserPassword('user-1', '321321321', '123123123', '123123123', (error) => {
  if (error) {
    console.error(error)

    return
  }
  console.log('Password updated!')
})
