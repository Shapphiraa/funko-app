// const {
//   validators: { validateEmail, validatePassword },
//   errors: { ExistenceError, AuthError },
// } = require('com')

import { User } from '../../../data/models'
// const bcrypt = require('bcryptjs')

export default function authenticateUser(email: string, password: string) {
  // validateEmail(email)
  // validatePassword(password)

  return (async () => {
    const user = await User.findOne({ email })

    if (!user) throw new Error('User not found! 😥')

    // const match = await bcrypt.compare(password, user.password)

    if (password !== user.password) throw new Error('Wrong password! 😥')

    return user.id
  })()
}
