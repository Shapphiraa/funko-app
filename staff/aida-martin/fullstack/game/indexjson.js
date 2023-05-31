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
    return (`${this.icon}, pos = ${this.pos}, time = ${this.time}`)
  }

  render() {
    console.log(' '.repeat(this.pos), this.icon)
  }
}

let time = 0

const taxi = new Car('🚖')
const thief = new Car('🚘')
const police = new Car('🚔')

let result = {
  last: [],
  previous: [],
}

const fs = require('fs');
fs.readFile('result.json', function (err, data) {
  if (err) return;

  try {
    const lastResult = JSON.parse(data);

    if (lastResult)  {
      result.previous = lastResult.previous;
      result.previous.splice(0, 0, lastResult.last)
    }
  } catch (e) {
    // El json no es válido.
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

    result.last.push(taxi.status())
    result.last.push(thief.status())
    result.last.push(police.status())

    //writeFile = sobreescribe (este se utilizó en clase)
    //readFile = lee
    //appendFile = añade al final de lo que hay
    //readFileSync = lee de forma síncrona
    // readWriteAppendFile = lee, escribe y añade (no lo encontré ¿?)

  fs.writeFile('result.json', JSON.stringify(result), function (err) {

  if (err) {

  console.log('error!')

  } else {

  console.log('success!')
  }

  })

}

}, LAPSE)