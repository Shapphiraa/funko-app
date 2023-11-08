import Products from './components/Products'
import Title from './library/Title'

export default function Home() {
  return (
    <section className="p-4 bg-white">
      <Title name="Latests releases" />
      <Products className="mt-3" search={true} />
    </section>
  )
}
