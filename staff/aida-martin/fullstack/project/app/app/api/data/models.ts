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
    default: '/default-avatar.png',
  },
  location: {
    type: String,
    enum: [
      'A Coruña (La Coruña)',
      'Álava',
      'Albacete',
      'Alicante',
      'Almería',
      'Asturias',
      'Ávila',
      'Badajoz',
      'Baleares',
      'Barcelona',
      'Burgos',
      'Cáceres',
      'Cádiz',
      'Cantabria',
      'Castellón',
      'Ciudad Real',
      'Córdoba',
      'Cuenca',
      'Girona',
      'Granada',
      'Guadalajara',
      'Gipuzkoa',
      'Huelva',
      'Huesca',
      'Jaén',
      'La Rioja',
      'Las Palmas',
      'León',
      'Lérida',
      'Lugo',
      'Madrid',
      'Málaga',
      'Murcia',
      'Navarra',
      'Ourense',
      'Palencia',
      'Pontevedra',
      'Salamanca',
      'Segovia',
      'Sevilla',
      'Soria',
      'Tarragona',
      'Santa Cruz de Tenerife',
      'Teruel',
      'Toledo',
      'Valencia',
      'Valladolid',
      'Vizcaya',
      'Zamora',
      'Zaragoza',
    ],
  },
  phoneNumber: {
    type: String,
    sparse: true,
    unique: true,
  },
  role: {
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
  // sales: {
  //   type: [ObjectId],
  //   ref: 'SalePop',
  // },
})

// const image = new Schema({
//   src: {
//     type: String,
//     required: true,
// unique: true,
//   },
//   alt: {
//     type: String,
//     required: true,
//   },
//   width: {
//     type: Number,
//     required: true,
//   },
//   height: {
//     type: Number,
//     required: true,
//   },
// })

const category = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
  },
  imageList: {
    type: String,
    required: true,
  },
  imageDetail: {
    type: String,
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
      'POP! RIDE',
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
    type: ObjectId,
    required: true,
    ref: 'Category',
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
    type: Boolean,
    default: false,
  },
  userWhislist: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const salePop = new Schema({
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
    type: [ObjectId],
    ref: 'Image',
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
// const Image = mongoose.models.Image || model('Image', image)
const Category = mongoose.models.Category || model('Category', category)
const Pop = mongoose.models.Pop || model('Pop', pop)
const SalePop = mongoose.models.SalePop || model('SalePop', salePop)

export { User, Category, Pop, SalePop }
