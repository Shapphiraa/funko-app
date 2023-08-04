import { categories } from '../../infraestructure/categories'
import Image from 'next/image'
import MenuHeader from '../../components/MenuHeader'
import Products from '../../components/Products'

export default function CatalogPages({ params }: { params: { slug: string } }) {
  const category = categories.find((element) => element.slug === params.slug)

  if (category) {
    return (
      <section className="pt-4 bg-white">
        <MenuHeader name={category.name} route="/catalog" />

        <Image
          className="shadow-lg"
          src={category.headerImage}
          alt={category.name}
          width={0}
          height={0}
          style={{ width: '100%', height: '200' }}
          quality="100"
        ></Image>

        <Products slug={params.slug} className="p-4" />
      </section>
    )
  }

  // TODO: redirect to 404 Page Not Found
  // return { notFound: true }
}
