import CategoryImage from '../components/CategoryImage'
import ContainerLink from '../components/ContainerLink'
import retrieveCategories from '../logic/retrieveCategories'
import MenuHeader from '../components/MenuHeader'

// Esto se hace así para no ponerlos en estado y cambiarlo a use client porque es una página estática y no va a cambiar normalmente (se puede indicar cada cuánto debe recargarla)
async function getData() {
  return await retrieveCategories()
}

export default async function Catalog() {
  const categories = await getData()

  return (
    <section className="py-4 bg-white">
      <MenuHeader name="Catalog" />

      <div className="grid grid-cols-2 px-4 gap-3 mt-4 place-items-center">
        {categories.map(({ name, imageList, slug }) => (
          <ContainerLink route={`/catalog/${slug}`}>
            <CategoryImage image={imageList} name={name} />
          </ContainerLink>
        ))}
      </div>
    </section>
  )
}
