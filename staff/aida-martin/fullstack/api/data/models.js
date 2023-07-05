const mongoose = require('mongoose')

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
  saves: {
    type: [ObjectId],
    ref: 'Post',
  },
})

const post = new Schema({
  author: {
    type: ObjectId || Object,
    ref: 'User',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  likes: {
    type: [ObjectId],
    ref: 'User',
  },
  visibility: {
    type: String,
    required: true,
    default: 'public',
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  saves: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const User = model('User', user)
const Post = model('Post', post)

module.exports = {
  User,
  Post,
}
