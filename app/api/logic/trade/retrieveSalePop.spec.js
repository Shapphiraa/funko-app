import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop, SalePop } from '../../data/models'
import retrieveSalePop from './retrieveSalePop'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('retrieveSalePop', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let user
  let category
  let pop
  let salePop

  beforeEach(async () => {
    user = generate.user()
    category = generate.category()
    pop = generate.pop()
    salePop = generate.salePop()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on retrieve sale pop', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'admin',
      location: user.location,
      phoneNumber: user.phoneNumber,
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

    await SalePop.create({
      author: userRegistered.id,
      description: salePop.description,
      condition: salePop.condition,
      pop: popCreated.id,
      images: salePop.images,
      price: salePop.price,
    })

    const newSalePop = await SalePop.findOne({ pop: popCreated.id })

    const salePopRecovered = await retrieveSalePop({ salePopId: newSalePop.id })

    expect(salePopRecovered).to.exist
    expect(salePopRecovered.description).to.equal(salePop.description)
    expect(salePopRecovered.condition).to.equal(salePop.condition)
    expect(salePopRecovered.price).to.be.a('number')
    expect(salePopRecovered.price).to.equal(salePop.price)
    expect(salePopRecovered.pop.id).to.equal(popCreated.id)
    expect(salePopRecovered.pop.name).to.equal(popCreated.name)
    expect(salePopRecovered.pop.variant).to.equal(popCreated.variant)
    expect(salePopRecovered.pop.exclusivity).to.equal(popCreated.exclusivity)
    expect(salePopRecovered.pop.number).to.equal(popCreated.number)
    expect(salePopRecovered.pop.category.name).to.equal(categoryCreated.name)
    expect(salePopRecovered.pop.collect).to.equal(popCreated.collect)
    expect(salePopRecovered.author.id).to.equal(userRegistered.id)
    expect(salePopRecovered.author.name).to.equal(userRegistered.name)
    expect(salePopRecovered.author.avatar).to.equal(userRegistered.avatar)
    expect(salePopRecovered.author.location).to.equal(userRegistered.location)
    expect(salePopRecovered.author.phoneNumber).to.equal(
      userRegistered.phoneNumber
    )
    expect(salePopRecovered.images).to.be.instanceOf(Array)
    expect(salePopRecovered.images).to.have.lengthOf(2)
  })

  it('fails on non-existing sale pop', async () => {
    try {
      await retrieveSalePop({ salePopId: '123123123123123123123123' })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Sale pop not found! 😥')
    }
  })
})
