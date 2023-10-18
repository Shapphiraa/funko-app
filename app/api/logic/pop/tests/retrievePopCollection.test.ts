import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import retrievePopCollection from './retrievePopCollection'

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

    await Pop.create({
      variant: 'POP!',
      exclusivity: 'Exclusive',
      name: 'PETER PAN FLYING - PETER PAN',
      number: 125,
      images: ['Peter-pan-flying.svg', 'Peter-pan-flying-box.svg'],
      category: `${category.id}`,
      collect: 'Peter Pan',
      release: '2020',
      availability: 'Available',
    })

    const pop1 = await Pop.findOne({ name: 'STITCH WITH FROG - LILO & STITCH' })
    const pop2 = await Pop.findOne({ name: 'PETER PAN FLYING - PETER PAN' })

    await User.create({
      name: 'Peter Pan',
      email: 'peter@pan.com',
      password: '123123123',
      repeatPassword: '123123123',
      popCollect: [`${pop1.id}`, `${pop2.id}`],
      popWhislist: [`${pop2.id}`],
    })

    const user = await User.findOne({ email: 'peter@pan.com' })

    const popCollection = await retrievePopCollection({ userId: user.id })

    console.log(popCollection)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.disconnect()
  }
})()
