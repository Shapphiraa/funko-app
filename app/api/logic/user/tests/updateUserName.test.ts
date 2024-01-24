import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Pop } from '../../data/models'
import updateUserName from './updateUserName'

dotenv.config()
;(async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )

    // await Promise.all([User.deleteMany(), Pop.deleteMany()])

    // await User.create({
    //   name: 'Peter Pan',
    //   email: 'peter@pan.com',
    //   password: '123123123',
    // })

    const user = await User.findOne({ email: 'peter@pan.com' })

    await updateUserName({
      userId: user.id,
      name: 'Wendy Darling',
    })

    const _user = await User.findOne({ email: 'peter@pan.com' })

    console.log(_user)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.disconnect()
  }
})()
