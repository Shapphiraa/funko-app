import dotenv from 'dotenv'
import { expect } from 'chai'
import { describe } from 'mocha'
import mongoose from 'mongoose'
import { User } from '../../data/models'
import authenticateUser from './authenticateUser'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('authenticateUser', () => {
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

  it('should succeed on authenticate user', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    const userId = await authenticateUser({
      email: user.email,
      password: user.password,
    })

    expect(userId).to.equal(userRegistered.id)
  })

  it('fails on non-existing user', async () => {
    try {
      await authenticateUser({ email: user.email, password: user.password })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })

  it('fails on existing user but wrong password', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await authenticateUser({
        email: userRegistered.email,
        password: 'wrong-password',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Wrong credentials! 😥')
    }
  })
})
