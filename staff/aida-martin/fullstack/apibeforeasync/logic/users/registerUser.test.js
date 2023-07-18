const registerUser = require('./registerUser')

registerUser(
  'Aida Martín',
  'aidamg93@gmail.com',
  '123123123',
  '123123123',
  (error) => {
    if (error) {
      console.error(error)

      return
    }

    console.log('user registered')
  }
)
