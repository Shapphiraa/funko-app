export const addEspace = (numbers: string) =>
Array.from(numbers).reduce((acc, t, i) => {
  if (i > 0 && i % 3 == 0) acc += ' '
  acc += t
  return acc
})