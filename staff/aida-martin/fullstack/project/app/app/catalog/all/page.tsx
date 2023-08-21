import Image from 'next/image'
import MenuHeader from '../../components/MenuHeader'
import Products from '../../components/Products'

export default async function AllCatalogPage() {
  return (
    <section className="pt-4 bg-white">
      <MenuHeader name="Catalog" route="/catalog" />

      <Image
        className="shadow-lg"
        src="/categories/All-Catalog.svg"
        alt="All-Catalog"
        width={0}
        height={0}
        style={{ width: '100%', height: '200' }}
        quality="100"
      ></Image>

      <Products className="p-4" />
    </section>
  )
}
