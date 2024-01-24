export default function calculateTrendingValue(prices: number[]) {
  let sum = 0

  for (let i = 0; i < prices.length; i++) {
    sum = sum + prices[i]
  }

  return Math.floor(sum / prices.length)
}
