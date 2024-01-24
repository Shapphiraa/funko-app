import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import retrievePopCollectionPreview from './retrievePopCollectionPreview'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('retrievePopCollectionPreview', () => {
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
      popCollect: [popCreated.id, secondPopCreated.id],
    })

    const userRegistered = await User.findOne({ email: user.email })

    const collectionPreviewRecovered = await retrievePopCollectionPreview({
      userId: userRegistered.id,
    })

    expect(collectionPreviewRecovered).to.exist
    expect(collectionPreviewRecovered).to.be.instanceOf(Object)
    expect(collectionPreviewRecovered.quantity).to.equal(
      userRegistered.popCollect.length
    )
    expect(collectionPreviewRecovered.lastAddedPopImage).to.equal(
      secondPopCreated.images[1]
    )
  })

  it('succeeds on return null when no pops in user collection', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'user',
      popCollect: [],
    })

    const userRegistered = await User.findOne({ email: user.email })

    const collectionPreviewRecovered = await retrievePopCollectionPreview({
      userId: userRegistered.id,
    })

    expect(collectionPreviewRecovered).to.be.null
  })

  it('fails on non-existing user', async () => {
    try {
      await retrievePopCollectionPreview({
        userId: '123123123123123123123123',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })
})
