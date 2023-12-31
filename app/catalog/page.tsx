import CategoryImage from '../components/CategoryImage'
import ContainerLink from '../components/ContainerLink'
import retrieveCategories from '../logic/retrieveCategories'
import MenuHeader from '../components/MenuHeader'

// This is done so as not to use state and make it client-side. It is a static page and will not normally change (you can indicate how often it should be reloaded)

async function getData() {
  try {
    return await retrieveCategories()
  } catch (error: any) {
    console.log(error)
  }
}

export default async function Catalog() {
  const categories = await getData()

  return (
    <section className="py-4 h-full bg-white">
      <MenuHeader name="Categories" text="All" direction="/catalog/all" />

      {categories && (
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-5 w-full mx-auto max-w-5xl px-4 gap-3 mt-4 place-items-center pb-4">
          {categories.map(({ name, imageList, slug }) => (
            <ContainerLink route={`/catalog/${slug}`}>
              <CategoryImage image={imageList} name={name} />
            </ContainerLink>
          ))}
        </div>
      )}
    </section>
  )
}
