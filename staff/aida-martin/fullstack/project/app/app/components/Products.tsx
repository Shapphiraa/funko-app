import Product from './Product'
import retrieveProducts from '../logic/retrieveProducts'

export default function Products() {
  const products = retrieveProducts()

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,_minmax(136px,1fr))] gap-4">
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
