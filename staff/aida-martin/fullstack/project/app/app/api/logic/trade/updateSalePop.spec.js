import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop, SalePop } from '../../data/models'
import updateSalePop from './updateSalePop'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('updateSalePop', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let user
  let secondUser
  let category
  let pop
  let salePop
  let secondSalePop

  beforeEach(async () => {
    user = generate.user()
    secondUser = generate.user()
    category = generate.category()
    pop = generate.pop()
    salePop = generate.salePop()
    secondSalePop = generate.salePop()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('succeeds on update sale pop', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'admin',
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

    await updateSalePop({
      userId: userRegistered.id,
      salePopId: newSalePop.id,
      description: secondSalePop.description,
      condition: secondSalePop.condition,
      price: secondSalePop.price,
      images: secondSalePop.images,
    })

    const salePopUpdated = await SalePop.findById(newSalePop.id)

    expect(salePopUpdated).to.exist
    expect(salePopUpdated.description).to.equal(secondSalePop.description)
    expect(salePopUpdated.condition).to.equal(secondSalePop.condition)
    expect(salePopUpdated.price).to.equal(secondSalePop.price)
    expect(salePopUpdated.images[0]).to.equal(secondSalePop.images[0])
    expect(salePopUpdated.images[1]).to.equal(secondSalePop.images[1])
  })

  it('fails on non-existing sale pop', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'user',
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await updateSalePop({
        userId: userRegistered.id,
        salePopId: '123123123123123123123123',
        description: secondSalePop.description,
        condition: secondSalePop.condition,
        price: secondSalePop.price,
        images: secondSalePop.images,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Sale pop not found! 😥')
    }
  })

  it('fails on non-existing user', async () => {
    try {
      await updateSalePop({
        userId: '123123123123123123123123',
        salePopId: '123123123123123123123123',
        description: secondSalePop.description,
        condition: secondSalePop.condition,
        price: secondSalePop.price,
        images: secondSalePop.images,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })

  it('fails on user is not the sale pop author', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'user',
    })

    const userRegistered = await User.findOne({ email: user.email })

    await User.create({
      name: secondUser.name,
      email: secondUser.email,
      password: secondUser.password,
      role: 'user',
    })

    const secondUserRegistered = await User.findOne({ email: secondUser.email })

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

    const salePopCreated = await SalePop.findOne({ pop: popCreated.id })

    try {
      await updateSalePop({
        userId: secondUserRegistered.id,
        salePopId: salePopCreated.id,
        description: secondSalePop.description,
        condition: secondSalePop.condition,
        price: secondSalePop.price,
        images: secondSalePop.images,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(
        `Sale pop with ID ${salePopCreated.id} does not belong to user with ID ${secondUserRegistered.id} 😥`
      )
    }
  })
})
