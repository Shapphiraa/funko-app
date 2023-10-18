import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User } from '../../data/models'
import updateUserPhoneNumber from './updateUserPhoneNumber'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('updateUserPhoneNumber', () => {
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

  it('should succeed on update user name', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    await updateUserPhoneNumber({
      userId: userRegistered.id,
      phoneNumber: '679854876',
    })

    const userRecovered = await User.findOne({ email: user.email })

    expect(userRecovered.phoneNumber).to.equal('679854876')
  })

  it('fails on new phone number matches the current one', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      phoneNumber: '679854876',
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await updateUserPhoneNumber({
        userId: userRegistered.id,
        phoneNumber: userRegistered.phoneNumber,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(
        'Your new phone number matches the current one 😥'
      )
    }
  })

  it('fails on non-existing user', async () => {
    try {
      await updateUserPhoneNumber({
        userId: '123123123123123123123123',
        phoneNumber: '679854876',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })

  it('fails on already existing the new phone number', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    await User.create({
      name: user.name,
      email: 'newemail@mail.com',
      password: user.password,
      phoneNumber: '679854876',
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await updateUserPhoneNumber({
        userId: userRegistered.id,
        phoneNumber: '679854876',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('You cannot use an existing phone number')
    }
  })
})
