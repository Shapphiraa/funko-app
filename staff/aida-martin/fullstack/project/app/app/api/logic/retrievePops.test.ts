import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Category, Pop } from '../../../data/models'
import retrievePops from './retrievePops'

dotenv.config()
;(async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`
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
      name: 'Harry Potter',
      slug: 'harry-potter',
      imageList: '/categories/Harry-Potter.svg',
      imageDetail: '/categories/Header-Harry-Potter.svg',
    })

    const category1 = await Category.findOne({ slug: 'disney' })
    const category2 = await Category.findOne({ slug: 'harry-potter' })

    await Pop.create({
      variant: 'POP!',
      exclusivity: 'Exclusive',
      name: 'STITCH WITH FROG - LILO & STITCH',
      number: 1452,
      images: ['Stitch-with-frog.svg', 'Stitch-with-frog-box.svg'],
      category: `${category1.id}`,
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
      category: `${category1.id}`,
      collect: 'Peter Pan',
      release: '2020',
      availability: 'Available',
    })

    await Pop.create({
      variant: 'POP!',
      exclusivity: 'Exclusive',
      name: 'HERMIONE GRANGER WITH WAND - HARRY POTTER',
      number: 156,
      images: [
        'Hermione-granger-with-wand.svg',
        'Hermione-granger-with-wand-box.svg',
      ],
      category: `${category2.id}`,
      collect: 'Harry Potter',
      release: '2019',
      availability: 'Coming Soon',
    })

    const allPops = await retrievePops({})
    const disneyPops = await retrievePops({ slug: category1.slug })
    const harryPotterPops = await retrievePops({ slug: category2.slug })

    console.log(allPops)
    console.log('-------')
    console.log(disneyPops)
    console.log('-------')
    console.log(harryPotterPops)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.disconnect()
  }
})()
