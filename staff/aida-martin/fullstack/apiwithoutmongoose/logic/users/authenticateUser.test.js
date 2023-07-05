const authenticateUser = require('./authenticateUser')

authenticateUser('aidamg93@gmail.com', '123123123', (error, userId) => {
  if (error) {
    console.error(error)

    return
  }

  console.log(`user with ID ${userId} authenticated`)
})
