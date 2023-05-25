const [, , a, b, op = '+'] = process.argv

switch (op) {
    case '+':
        console.log(Number(a) + Number(b))
        break
    case '-':
        console.log(Number(a) - Number(b))
        break
    case '*':
        console.log(Number(a) * Number(b))
        break
    case '/':
        console.log(Number(a) / Number(b))
        break
}