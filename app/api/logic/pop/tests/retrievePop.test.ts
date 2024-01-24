import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import retrievePop from './retrievePop'

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

    const category = await Category.findOne({ slug: 'disney' })

    await Pop.create({
      variant: 'POP!',
      exclusivity: 'Exclusive',
      name: 'STITCH WITH FROG - LILO & STITCH',
      number: 1452,
      images: ['Stitch-with-frog.svg', 'Stitch-with-frog-box.svg'],
      category: `${category.id}`,
      collect: 'Lilo & Stitch',
      release: '2021',
      availability: 'Available',
    })

    const pop = await Pop.findOne({ name: 'STITCH WITH FROG - LILO & STITCH' })

    const _pop = await retrievePop({ id: pop.id })

    console.log(_pop)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.disconnect()
  }
})()
