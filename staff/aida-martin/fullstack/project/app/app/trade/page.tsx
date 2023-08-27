import PopSales from '../components/PopSales'
import Tittle from '../library/Tittle'

export default function Trade() {
  return (
    <section className="p-4 bg-white">
      <Tittle name="Pops for sale" />
      <PopSales className="mt-3" />
    </section>
  )
}
