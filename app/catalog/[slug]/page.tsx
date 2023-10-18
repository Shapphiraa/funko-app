import { notFound } from 'next/navigation'
import Image from 'next/image'
import MenuHeader from '../../components/MenuHeader'
import Products from '../../components/Products'
import retrieveCategory from '../../logic/retrieveCategory'
import retrieveCategories from '../../logic/retrieveCategories'

// Statically generate routes (at build once only when building)
export async function generateStaticParams() {
  const categories = await retrieveCategories()

  return categories.map((category) => ({
    slug: category.slug,
  }))
}

async function getData(params: { slug: string }) {
  try {
    return await retrieveCategory(params)
  } catch (error) {
    return null
  }
}

export default async function CatalogPages({
  params,
}: {
  params: { slug: string }
}) {
  const category = await getData(params)

  if (!category) notFound()

  return (
    <section className="pt-4 bg-white">
      <MenuHeader name={category.name} route="/catalog" />

      <Image
        className="shadow-lg"
        src={category.imageDetail}
        alt={category.name}
        width={0}
        height={0}
        style={{ width: '100%', height: '200' }}
        quality="100"
      ></Image>

      <Products
        slug={params.slug}
        className="p-4"
        search={true}
        searchClassName="px-4"
      />
    </section>
  )
}
