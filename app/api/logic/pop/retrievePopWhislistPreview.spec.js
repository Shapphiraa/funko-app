import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import retrievePopWhislistPreview from './retrievePopWhislistPreview'
import { cleanUp, generate } from '../helpers/tests'
import { ExistenceError } from '../../../helpers'

dotenv.config()

describe('retrievePopWhislistPreview', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let user
  let category
  let pop
  let secondPop

  beforeEach(async () => {
    user = generate.user()
    category = generate.category()
    pop = generate.pop()
    secondPop = generate.pop()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on retrieve user pops collection', async () => {
    await Category.create({
      name: category.name,
      slug: category.name,
      imageList: category.imageList,
      imageDetail: category.imageDetail,
    })

    const categoryCreated = await Category.findOne({ name: category.name })

    await Pop.create({
      variant: pop.variant,
      exclusivity: pop.exclusivity,
      name: pop.name,
      number: pop.number,
      images: pop.images,
      category: categoryCreated.id,
      collect: pop.collect,
      release: pop.release,
      availability: pop.availability,
    })

    await Pop.create({
      variant: secondPop.variant,
      exclusivity: secondPop.exclusivity,
      name: secondPop.name,
      number: secondPop.number,
      images: secondPop.images,
      category: categoryCreated.id,
      collect: secondPop.collect,
      release: secondPop.release,
      availability: secondPop.availability,
    })

    const popCreated = await Pop.findOne({ name: pop.name })

    const secondPopCreated = await Pop.findOne({ name: pop.name })

    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'user',
      popWhislist: [popCreated.id, secondPopCreated.id],
    })

    const userRegistered = await User.findOne({ email: user.email })

    const whislistPreviewRecovered = await retrievePopWhislistPreview({
      userId: userRegistered.id,
    })

    expect(whislistPreviewRecovered).to.exist
    expect(whislistPreviewRecovered).to.be.instanceOf(Object)
    expect(whislistPreviewRecovered.quantity).to.equal(
      userRegistered.popWhislist.length
    )
    expect(whislistPreviewRecovered.lastAddedPopImage).to.equal(
      secondPopCreated.images[1]
    )
  })

  it('succeeds on return null when no pops in user whislist', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'user',
      popWhislist: [],
    })

    const userRegistered = await User.findOne({ email: user.email })

    const whislistPreviewRecovered = await retrievePopWhislistPreview({
      userId: userRegistered.id,
    })

    expect(whislistPreviewRecovered).to.be.null
  })

  it('fails on non-existing user', async () => {
    try {
      await retrievePopWhislistPreview({
        userId: '123123123123123123123123',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })
})
