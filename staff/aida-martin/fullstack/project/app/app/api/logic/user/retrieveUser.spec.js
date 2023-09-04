import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User } from '../../data/models'
import retrieveUser from './retrieveUser'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('retrieveUser', () => {
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

  it('should succeed on retrieve user', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    const userRecovered = await retrieveUser(userRegistered.id)

    expect(userRecovered).to.exist
    expect(userRecovered.name).to.equal(user.name)
    expect(userRecovered.email).to.equal(user.email)
    expect(userRecovered.avatar).to.equal('/default-avatar.png')
    expect(userRecovered.role).to.equal('user')
    expect(userRegistered.popCollect).to.have.lengthOf(0)
    expect(userRecovered.phoneNumber).to.be.undefined
    expect(userRecovered.location).to.be.undefined
  })

  it('fails on non-existing user', async () => {
    try {
      await retrieveUser('123456789101112131415123')
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })
})
