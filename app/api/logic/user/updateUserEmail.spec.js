import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User } from '../../data/models'
import updateUserEmail from './updateUserEmail'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('updateUserEmail', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
    )
  })

  let user

  beforeEach(async () => {
    user = generate.user()

    await cleanUp()
  })

  after(async () => {
    await mongoose.disconnect()
  })

  it('should succeed on update user email', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    await updateUserEmail({
      userId: userRegistered.id,
      email: 'newemail@mail.com',
    })

    const userRecovered = await User.findOne({ email: 'newemail@mail.com' })

    expect(userRecovered.email).to.equal('newemail@mail.com')
  })

  it('fails on new email matches the current one', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await updateUserEmail({
        userId: userRegistered.id,
        email: user.email,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(
        'Your new email matches the current one 😥'
      )
    }
  })

  it('fails on non-existing user', async () => {
    try {
      await updateUserEmail({
        userId: '123123123123123123123123',
        email: 'newemail@mail.com',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })

  it('fails on already existing the new email', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    await User.create({
      name: user.name,
      email: 'newemail@mail.com',
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await updateUserEmail({
        userId: userRegistered.id,
        email: 'newemail@mail.com',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('You cannot use an existing email')
    }
  })
})
