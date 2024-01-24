import dotenv from 'dotenv'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { User } from '../../data/models'
import updateUserAvatar from './updateUserAvatar'
import { cleanUp, generate } from '../helpers/tests'

dotenv.config()

describe('updateUserAvatar', () => {
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

  it('should succeed on update user avatar', async () => {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    const userRegistered = await User.findOne({ email: user.email })

    await updateUserAvatar({
      userId: userRegistered.id,
      avatar: '/avatar.jpg',
    })

    const userRecovered = await User.findById(userRegistered.id)

    expect(userRecovered.avatar).to.equal('/avatar.jpg')
  })

  it('fails on non-existing user', async () => {
    try {
      await updateUserAvatar({
        userId: '123123123123123123123123',
        avatar: '/avatar.jpg',
      })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found! 😥')
    }
  })
})
