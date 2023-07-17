import Product from './Product'
import retrieveProducts from '../logic/retrieveProducts'

export default function Products() {
  const products = retrieveProducts()

  return (
    <div className="w-full h-full grid grid-cols-2 gap-4">
      {products &&
        products.map((product) => (
          <Product
            image={product.image}
            type={product.type}
            name={product.name}
          />
        ))}
    </div>
  )
}
