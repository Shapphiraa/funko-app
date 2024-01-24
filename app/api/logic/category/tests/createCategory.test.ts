import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Category } from '../../../data/models'
import createCategory from '../createCategory'

dotenv.config()
;(async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )

    await Promise.all([User.deleteMany(), Category.deleteMany()])

    await User.create({
      name: 'Peter Pan',
      email: 'peter@pan.com',
      password: '123123123',
      repeatPassword: '123123123',
      avatar: null,
      rol: 'admin',
      popCollect: [],
      popWhislist: [],
    })

    const user = await User.findOne({ email: 'peter@pan.com' })

    await createCategory({
      userId: `${user.id}`,
      name: 'Disney',
      imageList: '/categories/Disney.svg',
      imageDetail: '/categories/Header-Disney.svg',
    })

    const category = await Category.findOne({ slug: 'disney' })

    console.log(category)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.disconnect()
  }
})()
