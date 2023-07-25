import Products from './components/Products'
import Tittle from './components/Tittle'

export default function Home() {
  return (
    <section className="p-4 bg-white">
      <Tittle name="Latests releases" />
      <Products />
    </section>
  )
}
