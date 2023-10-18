import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User } from '../../data/models'
import retrieveUserRole from './retrieveUserRole'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('retrieveUserRole', () => {
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

  it('should succeed on retrieve user role', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    const userRoleRecovered = await retrieveUserRole(userRegistered.id)

    expect(userRoleRecovered).to.exist
    expect(userRoleRecovered).to.equal(user.role)
  })

  it('fails on non-existing user', async () => {
    try {
      await retrieveUserRole('123456789101112131415123')
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })
})
