require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')

describe('registerUser', () => {
    let name, email, password, repeatPassword
  
    beforeEach(done => {
    name = `name-${Math.random()}`
    email = `e-${Math.random()}@gmail.com`
    password = `password-${Math.random()}`
    repeatPassword = password
    
    writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
    })
  
  it('should succeed on new user', done => {
      registerUser(name, email, password, repeatPassword, error => {
          expect(error).to.be.null

          readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
              expect(error).to.be.null

              const users = JSON.parse(json)

              const user = users.find(user => user.email === email)

              expect(user).to.exist
              expect(user.id).to.be.a('string')
              expect(user.name).to.equal(name)
              expect(user.email).to.equal(email)
              expect(user.password).to.equal(password)
              expect(user.avatar).to.be.null
              expect(user.saves).to.have.lengthOf(0)

              done()
          })
      })
  })

  it('succeeds on other existing user', done => {
    const idCount = Math.round(Math.random() * 100 + 1)
    const id2 = `user-${idCount}`
    const name2 = `name-${Math.random()}`
    const email2 = `e-${Math.random()}@mail.com`
    const password2 = `password-${Math.random()}`

    const users = [{ id: id2, name: name2, email: email2, password: password2 }]
    const json = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
        expect(error).to.be.null

        registerUser(name, email, password, repeatPassword, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === email)

                expect(user).to.exist
                expect(user.id).to.equal(`user-${idCount + 1}`)
                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.avatar).to.be.null
                expect(user.saves).to.have.lengthOf(0)

                done()
            })
        })
    })
})

  //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (USUARIO YA REGISTRADO):

  it('should fail on existing user', done => {
      const users = [{ name, email, password }]
      const json = JSON.stringify(users)

      writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
          expect(error).to.be.null

          registerUser(name, email, password, repeatPassword, error => {
              expect(error).to.be.instanceOf(Error)
              expect(error.message).to.equal('You are already registered! Please login! 😅')

              done()
          })
      })
  })
  
   //ENTORNO DE PRUEBA EN EL QUE DEBERÍA FALLAR (CONTRASEÑAS NO COINCIDEN):

  it('should fail on password and repeatPassword does not match', done => {

        registerUser(name, email, password, `repeatPassword-${Math.random()}`, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('Passwords does not match 😢')

            done()
        })
})

//ALGUNOS EJEMPLOS DE VALIDADORES (no todos):

it('fails on empty name', () => {
    expect(() => registerUser('', email, password, repeatPassword, () => { })).to.throw(Error, 'Name is empty 😥')
})

it('fails on empty email', () =>
    expect(() => registerUser(name, '', password, repeatPassword, () => { })).to.throw(Error, 'Email is empty 😥')
)

it('fails on non-string name', () => {
    expect(() => registerUser(undefined, email, password, repeatPassword, () => { })).to.throw(Error, 'Name is not a string 😥')
    expect(() => registerUser(1, email, password, repeatPassword, () => { })).to.throw(Error, 'Name is not a string 😥')
    expect(() => registerUser(true, email, password, repeatPassword, () => { })).to.throw(Error, 'Name is not a string 😥')
    expect(() => registerUser({}, email, password, repeatPassword, () => { })).to.throw(Error, 'Name is not a string 😥')
    expect(() => registerUser([], email, password, repeatPassword, () => { })).to.throw(Error, 'Name is not a string 😥')
})

it('fails on non-string email', () => {
    expect(() => registerUser(name, undefined, password, repeatPassword, () => { })).to.throw(Error, 'Email is not a string 😥')
    expect(() => registerUser(name, 1, password, repeatPassword, () => { })).to.throw(Error, 'Email is not a string 😥')
    expect(() => registerUser(name, true, password, repeatPassword, () => { })).to.throw(Error, 'Email is not a string 😥')
    expect(() => registerUser(name, {}, password, repeatPassword, () => { })).to.throw(Error, 'Email is not a string 😥')
    expect(() => registerUser(name, [], password, repeatPassword, () => { })).to.throw(Error, 'Email is not a string 😥')
})


  //LIMPIAR LA BASE DE DATOS DESPUÉS:
  after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))
})