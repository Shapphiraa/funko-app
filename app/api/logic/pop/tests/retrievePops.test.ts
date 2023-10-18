import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import retrievePops from './retrievePops'

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

    const pop1 = await Pop.findOne({ name: 'STITCH WITH FROG - LILO & STITCH' })
    const pop2 = await Pop.findOne({ name: 'PETER PAN FLYING - PETER PAN' })

    await User.create({
      name: 'Peter Pan',
      email: 'peter@pan.com',
      password: '123123123',
      repeatPassword: '123123123',
      popCollect: [`${pop1.id}`],
      popWhislist: [`${pop2.id}`],
    })

    const user = await User.findOne({ email: 'peter@pan.com' })

    // Sin usuario logueado:
    const allPops = await retrievePops({ filter: {} })
    const disneyPops = await retrievePops({ filter: { slug: category1.slug } })
    const harryPotterPops = await retrievePops({
      filter: { slug: category2.slug },
    })

    console.log(allPops)
    console.log('-------')
    console.log(disneyPops)
    console.log('-------')
    console.log(harryPotterPops)

    // Con usuario logueado:
    const allUserLoggedPops = await retrievePops({
      userId: user.id,
      filter: {},
    })
    const userLoggedDisneyPops = await retrievePops({
      userId: user.id,
      filter: { slug: category1.slug },
    })
    const userLoggedHarryPotterPops = await retrievePops({
      userId: user.id,
      filter: { slug: category2.slug },
    })

    console.log(allUserLoggedPops)
    console.log('-------')
    console.log(userLoggedDisneyPops)
    console.log('-------')
    console.log(userLoggedHarryPotterPops)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.disconnect()
  }
})()
