import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop } from '../../data/models'
import retrievePops from './retrievePops'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('retrievePops', () => {
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

  it('succeeds on retrieve pops without slug filter and without an user logged', async () => {
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

    const popsRecovered = await retrievePops({ filter: { slug: null } })

    expect(popsRecovered).to.exist
    expect(popsRecovered).to.be.instanceOf(Array)
    expect(popsRecovered).to.have.lengthOf(2)
    expect(popsRecovered[0].variant).to.equal(popCreated.variant)
    expect(popsRecovered[1].variant).to.equal(secondPopCreated.variant)
  })

  it('succeeds on retrieve pops without slug filter but with an user logged', async () => {
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

    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'user',
    })

    const userRegistered = await User.findOne({ email: user.email })

    const popCreated = await Pop.findOne({ name: pop.name })

    const secondPopCreated = await Pop.findOne({ name: pop.name })

    const popsRecovered = await retrievePops({
      userId: userRegistered.id,
      filter: { slug: null },
    })

    expect(popsRecovered).to.exist
    expect(popsRecovered).to.be.instanceOf(Array)
    expect(popsRecovered).to.have.lengthOf(2)
    expect(popsRecovered[0].variant).to.equal(popCreated.variant)
    expect(popsRecovered[1].variant).to.equal(secondPopCreated.variant)
    expect(popsRecovered[0].userCollect).to.be.false
    expect(popsRecovered[1].userWhislist).to.be.false
  })

  it('succeeds on retrieve pops with slug filter', async () => {
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

    const popsRecovered = await retrievePops({
      filter: { slug: categoryCreated.name },
    })

    expect(popsRecovered).to.exist
    expect(popsRecovered).to.be.instanceOf(Array)
    expect(popsRecovered).to.have.lengthOf(2)
    expect(popsRecovered[0].variant).to.equal(popCreated.variant)
    expect(popsRecovered[1].variant).to.equal(secondPopCreated.variant)
  })

  it('succeeds on retrieve pops with search filter', async () => {
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
      name: 'STITCH WITH TURTLE',
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
      name: 'HARRY POTTER WITH WAND',
      number: secondPop.number,
      images: secondPop.images,
      category: categoryCreated.id,
      collect: secondPop.collect,
      release: secondPop.release,
      availability: secondPop.availability,
    })

    const popCreated = await Pop.findOne({ name: 'STITCH WITH TURTLE' })

    const popsRecovered = await retrievePops({
      filter: { search: ' stitch ' },
    })

    expect(popsRecovered).to.exist
    expect(popsRecovered).to.be.instanceOf(Array)
    expect(popsRecovered).to.have.lengthOf(1)
    expect(popsRecovered[0].name).to.equal(popCreated.name)
  })

  it('fails on an user logged but non-existing user', async () => {
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

    try {
      await retrievePops({
        userId: '123123123123123123123123',
        filter: { slug: categoryCreated.slug },
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })

  it('fails on there is slug filter but non-existing category', async () => {
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

    try {
      await retrievePops({
        filter: { slug: 'fakeSlug' },
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Category not found! 😥')
    }
  })
})
