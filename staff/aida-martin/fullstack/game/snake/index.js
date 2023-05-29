console.log('SNAKE GAME v0')

// const board = (Array(10).fill(Array(30).fill(`.`).join('')).join('\n'))
// const board = Array(10).fill(Array(30).fill('*'))

const board = []

for (let i = 0; i < 10; i++) {
  board.push(Array(30).fill('.'))
}

const snake = [
  [4, 4], [5, 4]
]

snake.forEach(([y, x]) => {
  board[y][x] = '#'
})

const food = 'o'

board[Math.round(Math.random() * 10)][Math.round(Math.random() * 30)] = food

console.log(board.join(`\n`).replaceAll(',', ''))