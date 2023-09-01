import Products from './components/Products'
import Tittle from './library/Tittle'

export default function Home() {
  return (
    <section className="p-4 bg-white">
      <Tittle name="Latests releases" />
      <Products className="mt-3" search={true} />
    </section>
  )
}
