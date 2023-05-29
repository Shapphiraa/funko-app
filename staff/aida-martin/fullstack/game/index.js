console.log('GAME v0.1')

const STEP = 5, LAPSE = 200

class Car {
  constructor(icon) {
    this.icon = icon
    
    this.pos = 0
    this.time = 0
  }

  move() {
    this.pos += Math.round(STEP * (1 - Math.random()))
  }

  status() {
    return (`${this.icon}, pos = ${this.pos}, time = ${this.time} \n`)
  }

  render() {
    console.log(' '.repeat(this.pos), this.icon)
  }
}

let time = 0

const taxi = new Car('🚖')
const thief = new Car('🚘')
const police = new Car('🚔')

let result = ''
let contain

const fs = require('fs');

fs.readFile('result.txt', 'utf-8', function (err, data) {

  if (err) {

  console.log('read error!')

  } else {
    if (data) contain = data
  }
  })

const interval = setInterval(() => {
  console.clear()
  time += LAPSE

  if (taxi.pos < 100) {
    taxi.render()
    taxi.move()
    taxi.time = time
  }

  if (thief.pos < 100) {
    thief.render()
    thief.move()
    thief.time = time
  }

  if (police.pos < 100) {
    police.render()
    police.move()
    police.time = time
  }

  if (taxi.pos >= 100 && thief.pos >= 100 && police.pos >= 100) {
    clearInterval(interval)

    result += taxi.status()
    result += thief.status()
    result += police.status()
    if (contain != undefined) result += `\n${contain}`

    //writeFile = sobreescribe (este se utilizó en clase)
    //readFile = lee
    //appendFile = añade al final de lo que hay
    //readFileSync = lee de forma síncrona
    // readWriteAppendFile = lee, escribe y añade (no lo encontré ¿?)

  fs.writeFile('result.txt', result, function (err) {

  if (err) {

  console.log('error!')

  } else {

  console.log('success!')
  }

  })

}

}, LAPSE)