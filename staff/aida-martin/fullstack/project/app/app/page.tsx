import Products from './components/Products'

export default function Home() {
  return (
    <section className="p-4 bg-white">
      <h1 className="text-xl  text-text-light text-center mb-3">
        Latests releases
      </h1>
      <Products />
    </section>
  )
}
