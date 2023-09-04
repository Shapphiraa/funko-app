import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Pop } from '../../data/models'
import retrieveUser from './retrieveUser'

dotenv.config()
;(async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )

    await Promise.all([User.deleteMany(), Pop.deleteMany()])

    await User.create({
      name: 'Peter Pan',
      email: 'peter@pan.com',
      password: '123123123',
    })

    const user = await User.findOne({ email: 'peter@pan.com' })

    const _user = await retrieveUser(user.id)

    console.log(_user)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.disconnect()
  }
})()
