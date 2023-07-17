import Products from './components/Products'

export default function Home() {
  return (
    <section className="p-4">
      <h1 className="text-xl text-[#656263] text-center mb-3">
        Latests releases
      </h1>
      <Products />
    </section>
  )
}
