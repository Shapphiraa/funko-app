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
    // required: true
  },
  phoneNumber: {
    type: String,
    // unique: true
  },
  rol: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
    default: 'user',
  },
  popCollect: {
    type: [ObjectId],
    ref: 'Pop',
  },
  popWhislist: {
    type: [ObjectId],
    ref: 'Pop',
  },
})

const image = new Schema({
  src: {
    type: String,
    required: true,
    // unique: true,
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
    enum: [
      'POP!',
      'POP! DELUXE',
      'POP! MOMENT',
      'POP! 2-PACK',
      'POP! SUPER',
      'POP! JUMBO',
      'POP! COVER',
      'POP! ALBUM',
      'POP! MOVIE POSTER',
      'POP! TRAIN',
    ],
    required: true,
  },
  exclusivity: {
    type: String,
    enum: ['Exclusive', 'Regular'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  images: {
    // type: [image],
    type: [String],
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Disney',
      'Harry Potter',
      'Games',
      'Anime',
      'Music',
      'Movies & TV',
      'Animation',
      'Sports',
    ],
    required: true,
  },
  collect: {
    type: String,
    required: true,
  },
  release: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    enum: ['Coming Soon', 'Available', 'Temporarily Unavailable', 'Vaulted'],
    required: true,
  },
  trendingValue: {
    type: Number,
    default: 0,
    required: true,
  },
  userCollect: {
    type: [ObjectId],
    ref: 'User',
  },
  userWhislist: {
    type: [ObjectId],
    ref: 'User',
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
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
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    minLength: 50,
  },
  number: {
    type: Number,
    required: true,
  },
  images: {
    type: [image],
    required: true,
  },
  variant: {
    type: String,
    enum: [
      'POP!',
      'POP! DELUXE',
      'POP! MOMENT',
      'POP! 2-PACK',
      'POP! SUPER',
      'POP! JUMBO',
      'POP! COVER',
      'POP! ALBUM',
      'POP! MOVIE POSTER',
      'POP! TRAIN',
    ],
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Disney',
      'Harry Potter',
      'Games',
      'Anime',
      'Music',
      'Movies & TV',
      'Animation',
      'Sports',
    ],
    required: true,
  },
  exclusivity: {
    type: String,
    enum: ['Exclusive', 'Regular'],
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
    enum: ['Available', 'Reserved', 'Sold'],
    required: true,
    default: 'Available',
  },
})

// Se hace así por Vercel, para que, si ya está montado el modelo, lo utilice y no lo vuelva a crear
const User = mongoose.models.User || mongoose.model('User', user)
const Image = mongoose.models.Image || model('Image', image)
const Pop = mongoose.models.Pop || model('Pop', pop)
const SalePost = mongoose.models.SalePost || model('SalePost', salePost)

export { User, Image, Pop, SalePost }
