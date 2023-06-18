const { writeFile } = require('fs')

module.exports = (callback) =>
  writeFile(`${process.env.DB_PATH}/users.json`, '[]', (error) => {
    if (error) {
      callback(error)

      return
    }

    writeFile(`${process.env.DB_PATH}/posts.json`, '[]', (error) =>
      callback(error)
    )
  })
