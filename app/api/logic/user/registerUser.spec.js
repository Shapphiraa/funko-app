import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User } from '../../data/models'
import registerUser from './registerUser'
import { cleanUp, generate } from '../helpers/tests'
import bcrypt from 'bcryptjs'

dotenv.config()

describe('registerUser', () => {
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

  it('succeeds on new user', async () => {
    await registerUser({
      name: user.name,
      email: user.email,
      password: user.password,
      repeatPassword: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    const match = await bcrypt.compare(user.password, userRegistered.password)

    expect(userRegistered).to.exist
    expect(userRegistered.name).to.equal(user.name)
    expect(userRegistered.email).to.equal(user.email)
    expect(match).to.be.true
    expect(userRegistered.avatar).to.equal('/default-avatar.png')
    expect(userRegistered.role).to.equal('user')
    expect(userRegistered.popCollect).to.have.lengthOf(0)
    expect(userRegistered.popWhislist).to.have.lengthOf(0)
  })

  it('fails on existing user', async () => {
    await registerUser({
      name: user.name,
      email: user.email,
      password: user.password,
      repeatPassword: user.password,
    })

    try {
      await registerUser({
        name: user.name,
        email: user.email,
        password: user.password,
        repeatPassword: user.password,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(
        'You are already registered! Please login! 😅'
      )
    }
  })

  it('fails on non-matching passwords', async () => {
    try {
      await registerUser({
        name: user.name,
        email: user.email,
        password: user.password,
        repeatPassword: 'password',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Passwords does not match 😢')
    }
  })

  // Some validators tests:

  it('fails on empty name', () =>
    expect(() =>
      registerUser(
        {
          name: '',
          email: user.email,
          password: user.password,
          repeatPassword: user.password,
        },
        () => {}
      )
    ).to.throw(Error, 'Name is empty 😥'))

  it('fails on empty email', () =>
    expect(() =>
      registerUser(
        {
          name: user.name,
          email: '',
          password: user.password,
          repeatPassword: user.password,
        },
        () => {}
      )
    ).to.throw(Error, 'Email is empty 😥'))

  it('fails on non-valid email', () =>
    expect(() =>
      registerUser(
        {
          name: user.name,
          email: 'fakeEmail',
          password: user.password,
          repeatPassword: user.password,
        },
        () => {}
      )
    ).to.throw(Error, 'Email is not valid 😥'))

  it('fails on non-string name', () => {
    expect(() =>
      registerUser(
        {
          name: undefined,
          email: user.email,
          password: user.password,
          repeatPassword: user.password,
        },
        () => {}
      )
    ).to.throw(Error, 'Name is not a string')

    expect(() =>
      registerUser(
        {
          name: 1,
          email: user.email,
          password: user.password,
          repeatPassword: user.password,
        },
        () => {}
      )
    ).to.throw(Error, 'Name is not a string 😥')

    expect(() =>
      registerUser(
        {
          name: null,
          email: user.email,
          password: user.password,
          repeatPassword: user.password,
        },
        () => {}
      )
    ).to.throw(Error, 'Name is not a string 😥')

    expect(() =>
      registerUser(
        {
          name: {},
          email: user.email,
          password: user.password,
          repeatPassword: user.password,
        },
        () => {}
      )
    ).to.throw(Error, 'Name is not a string 😥')

    expect(() =>
      registerUser(
        {
          name: [],
          email: user.email,
          password: user.password,
          repeatPassword: user.password,
        },
        () => {}
      )
    ).to.throw(Error, 'Name is not a string 😥')
  })

  it('fails on non-string email', () => {
    expect(() =>
      registerUser(
        {
          name: user.name,
          email: 23,
          password: user.password,
          repeatPassword: user.password,
        },
        () => {}
      )
    ).to.throw(Error, 'Email is not a string 😥')
  })
})
