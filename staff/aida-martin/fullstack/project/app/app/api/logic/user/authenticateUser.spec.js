import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User } from '../../data/models'
import authenticateUser from './authenticateUser'
import { cleanUp, generate } from '../helpers/tests'
import bcrypt from 'bcryptjs'

dotenv.config()

describe('authenticateUser', () => {
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

  it('should succeed on authenticate user', async () => {
    const hash = await bcrypt.hash(user.password, 10)

    await User.create({
      name: user.name,
      email: user.email,
      password: hash,
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

  // Some validators tests:

  it('fails on non-string password', () =>
    expect(() =>
      authenticateUser(
        {
          email: user.email,
          password: 23,
        },
        () => {}
      )
    ).to.throw(Error, 'Password is not a string 😥'))

  it('fails on empty password', () =>
    expect(() =>
      authenticateUser(
        {
          email: user.email,
          password: '',
        },
        () => {}
      )
    ).to.throw(Error, 'Password is empty 😥'))

  it('fails on password does length lower than 8 characters', () =>
    expect(() =>
      authenticateUser(
        {
          email: user.email,
          password: '1234567',
        },
        () => {}
      )
    ).to.throw(Error, 'Password does not have 8 characters 😥'))
})
