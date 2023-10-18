import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User, Category, Pop, SalePop } from '../../data/models'
import createSalePop from './createSalePop'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('createSalePop', () => {
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

  it('succeeds on create new sale pop', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'admin',
    })

    await Category.create({
      name: category.name,
      slug: category.name,
      imageList: category.imageList,
      imageDetail: category.imageDetail,
    })

    const userRegistered = await User.findOne({ email: user.email })

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

    await createSalePop({
      userId: userRegistered.id,
      description: salePop.description,
      condition: salePop.condition,
      pop: popCreated.id,
      images: salePop.images,
      price: salePop.price,
    })

    const newSalePop = await SalePop.findOne({ pop: popCreated.id })

    expect(newSalePop).to.exist
    expect(newSalePop.author.toString()).to.equal(userRegistered.id)
    expect(newSalePop.description).to.equal(salePop.description)
    expect(newSalePop.condition).to.equal(salePop.condition)
    expect(newSalePop.images).to.be.instanceOf(Array)
    expect(newSalePop.images).to.have.lengthOf(2)
    expect(newSalePop.date).to.be.instanceOf(Date)
    expect(newSalePop.price).to.equal(salePop.price)
    expect(newSalePop.status).to.equal(salePop.status)
  })

  it('fails on non-existing user', async () => {
    try {
      await createSalePop({
        userId: '123123123123123123123123',
        description: salePop.description,
        condition: salePop.condition,
        pop: '123123123123123123123123',
        images: salePop.images,
        price: salePop.price,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })

  it('fails on non-string description', () => {
    expect(() =>
      createSalePop(
        {
          userId: '123123123123123123123123',
          description: 23,
          condition: salePop.condition,
          pop: '123123123123123123123123',
          images: salePop.images,
          price: salePop.price,
        },
        () => {}
      )
    ).to.throw(Error, 'Description is not a string 😥')
  })

  it('fails on empty description', () => {
    expect(() =>
      createSalePop(
        {
          userId: '123123123123123123123123',
          description: '',
          condition: salePop.condition,
          pop: '123123123123123123123123',
          images: salePop.images,
          price: salePop.price,
        },
        () => {}
      )
    ).to.throw(Error, 'Description is empty 😥')
  })

  it('fails on description length lower than 20 characters', () => {
    expect(() =>
      createSalePop(
        {
          userId: '123123123123123123123123',
          description: '123',
          condition: salePop.condition,
          pop: '123123123123123123123123',
          images: salePop.images,
          price: salePop.price,
        },
        () => {}
      )
    ).to.throw(Error, 'Description does not have 20 characters 😥')
  })

  it('fails on user id is not a string', () => {
    expect(() =>
      createSalePop(
        {
          userId: 23,
          description: salePop.description,
          condition: salePop.condition,
          pop: '123123123123123123123123',
          images: salePop.images,
          price: salePop.price,
        },
        () => {}
      )
    ).to.throw(Error, 'User ID is not a string 😥')
  })

  it('fails on user id does not have 24 characters', () => {
    expect(() =>
      createSalePop(
        {
          userId: '123',
          description: salePop.description,
          condition: salePop.condition,
          pop: '123123123123123123123123',
          images: salePop.images,
          price: salePop.price,
        },
        () => {}
      )
    ).to.throw(Error, 'User ID does not have 24 characters 😥')
  })

  it('fails on user id not a hexadecimal', () => {
    expect(() =>
      createSalePop(
        {
          userId: '-$.-$.2a-$.2a-$.2a-$.2a-',
          description: salePop.description,
          condition: salePop.condition,
          pop: '123123123123123123123123',
          images: salePop.images,
          price: salePop.price,
        },
        () => {}
      )
    ).to.throw(Error, 'User ID is not hexadecimal 😥')
  })
})
