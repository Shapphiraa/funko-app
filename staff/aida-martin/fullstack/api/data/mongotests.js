const mongodb = require('mongodb')

const { MongoClient, ObjectId } = mongodb

//en la ruta se podría localhost en vez de 127.0.0.1 (pero no funciona)
const client = new MongoClient('mongodb://127.0.0.1:27017/data')

//promises:
client
  .connect()
  //el then encadena otra promesa a la anterior, hasta que la anterior no termina, el then no se procesa
  .then((connection) => {
    const db = connection.db()

    const users = db.collection('users')
    const posts = db.collection('posts')

    // return users.insertOne({ name: "Sire Nita", email: "sire@nita.com", password: "123123123" })

    // return posts.insertOne({
    //   author: new ObjectId('64940a545c8c5361cfffbb0f'),
    //   image: 'https:image.com/lasirenita',
    //   text: 'Hi!',
    //   date: new Date(),
    // })

    return posts
      .find({ author: new ObjectId('64940a545c8c5361cfffbb0f') })
      .toArray()
  })
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
  //para desconectar al final
  .finally(() => client.close())
