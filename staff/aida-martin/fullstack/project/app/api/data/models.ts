import mongoose from 'mongoose'

const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = mongoose

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  avatar: {
    type: String,
  },
  adress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    default: 'user',
  },
  collection: {
    type: [ObjectId],
    ref: 'Pop',
  },
  whislist: {
    type: [ObjectId],
    ref: 'Pop',
  },
})

const image = new Schema({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
})

const pop = new Schema({
  variant: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [ObjectId],
    ref: 'Image',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  collection: {
    type: [ObjectId],
    ref: 'User',
  },
  whislist: {
    type: [ObjectId],
    ref: 'User',
  },
  userCollection: {
    type: Boolean,
    required: true,
    default: false,
  },
  userWhislist: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const salePost = new Schema({
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [ObjectId],
    ref: 'Image',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})

const User = model('User', user)
const Image = model('Image', image)
const Pop = model('Pop', pop)
const SalePost = model('salePost', salePost)

module.exports = {
  User,
  Image,
  Pop,
  SalePost,
}
