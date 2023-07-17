import products from '../../data/products.json'

interface Product {
  type: string
  name: string
  image: string
}

export default function retrieveProducts(): Product[] {
  return products
}
