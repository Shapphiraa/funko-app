import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop, SalePop } from '../../data/models'
import retrieveSalePops from './retrieveSalePops'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('retrieveSalePops', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let user
  let category
  let pop
  let secondPop
  let salePop

  beforeEach(async () => {
    user = generate.user()
    category = generate.category()
    pop = generate.pop()
    secondPop = generate.pop()
    salePop = generate.salePop()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on retrieve sale pops', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'user',
    })

    const userRegistered = await User.findOne({ email: user.email })

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

    const popCreated = await Pop.findOne({ name: pop.name })

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

    const secondPopCreated = await Pop.findOne({ name: secondPop.name })

    await SalePop.create({
      author: userRegistered.id,
      description: salePop.description,
      condition: salePop.condition,
      pop: popCreated.id,
      images: salePop.images,
      price: salePop.price,
      status: 'Available',
    })

    await SalePop.create({
      author: userRegistered.id,
      description: salePop.description,
      condition: salePop.condition,
      pop: secondPopCreated.id,
      images: salePop.images,
      price: salePop.price,
      status: 'Reserved',
    })

    await SalePop.create({
      author: userRegistered.id,
      description: salePop.description,
      condition: salePop.condition,
      pop: popCreated.id,
      images: salePop.images,
      price: salePop.price,
      status: 'Sold',
    })

    const salePopsRecovered = await retrieveSalePops()

    expect(salePopsRecovered).to.exist
    expect(salePopsRecovered).to.be.instanceOf(Array)
    expect(salePopsRecovered).to.have.lengthOf(2)
    expect(salePopsRecovered[1].status).to.be.equal('Available')
    expect(salePopsRecovered[0].status).to.be.equal('Reserved')
  })
})
