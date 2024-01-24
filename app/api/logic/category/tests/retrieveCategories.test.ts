import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import retrieveCategories from './retrieveCategories'

dotenv.config()
;(async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )

    await Promise.all([
      User.deleteMany(),
      Category.deleteMany(),
      Pop.deleteMany(),
    ])

    await Category.create({
      name: 'Disney',
      slug: 'disney',
      imageList: '/categories/Disney.svg',
      imageDetail: '/categories/Header-Disney.svg',
    })

    await Category.create({
      name: 'Anime',
      slug: 'anime',
      imageList: '/categories/Anime.svg',
      imageDetail: '/categories/Header-Anime.svg',
    })

    const categories = await retrieveCategories()

    console.log(categories)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.disconnect()
  }
})()
