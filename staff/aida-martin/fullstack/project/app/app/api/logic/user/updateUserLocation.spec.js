import dotenv from 'dotenv'
import { expect } from 'chai'
import { describe } from 'mocha'
import mongoose from 'mongoose'
import { User } from '../../data/models'
import updateUserLocation from './updateUserLocation'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('updateUserLocation', () => {
  before(async () => {
    await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`
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

    await updateUserLocation({ userId: userRegistered.id, location: 'Granada' })

    const userRecovered = await User.findOne({ email: user.email })

    expect(userRecovered.location).to.equal('Granada')
  })

  it('fails on non-existing user', async () => {
    try {
      await updateUserLocation({
        userId: '123123123123123123123123',
        location: 'Granada',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })
})
