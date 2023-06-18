const retrieveUser = require('./retrieveUser')

retrieveUser('user-1', (error, user) => {
  if (error) {
    console.error(error)

    return
  }

  console.log(user)
})
