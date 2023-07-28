import CategoryImage from '../components/CategoryImage'
import ContainerLink from '../components/ContainerLink'
import { categories } from '../infraestructure/categories'
import MenuHeader from '../components/MenuHeader'

export default function Catalog() {
  return (
    <section className="py-4 bg-white">
      <MenuHeader name="Catalog" />

      <div className="grid grid-cols-2 px-4 gap-3 mt-4 place-items-center">
        {categories.map(({ image, name, route }) => (
          <ContainerLink route={route}>
            <CategoryImage image={image} name={name} />
          </ContainerLink>
        ))}
      </div>
    </section>
  )
}
