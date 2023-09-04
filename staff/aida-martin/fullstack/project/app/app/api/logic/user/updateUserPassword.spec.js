import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User } from '../../data/models'
import updateUserPassword from './updateUserPassword'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('updateUserPassword', () => {
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

  it('should succeed on update user password', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    await updateUserPassword({
      userId: userRegistered.id,
      password: user.password,
      newPassword: 'newPassword',
      newPasswordConfirm: 'newPassword',
    })

    const userRecovered = await User.findById(userRegistered.id)

    expect(userRecovered.password).to.equal('newPassword')
  })

  it('fails on non-matching passwords', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await updateUserPassword({
        userId: userRegistered.id,
        password: user.password,
        newPassword: 'newPassword',
        newPasswordConfirm: 'newPassword$',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Passwords does not match 😥')
    }
  })

  it('fails on non-existing user', async () => {
    try {
      await updateUserPassword({
        userId: '123123123123123123123123',
        password: user.password,
        newPassword: 'newPassword',
        newPasswordConfirm: 'newPassword',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })

  it('fails on new email matches the current one', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    try {
      await updateUserPassword({
        userId: userRegistered.id,
        password: user.password,
        newPassword: user.password,
        newPasswordConfirm: user.password,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(
        'Your new password matches the current one 😥'
      )
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
      await updateUserPassword({
        userId: userRegistered.id,
        password: 'fakePassword',
        newPassword: user.password,
        newPasswordConfirm: user.password,
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Wrong password! 😥')
    }
  })
})
