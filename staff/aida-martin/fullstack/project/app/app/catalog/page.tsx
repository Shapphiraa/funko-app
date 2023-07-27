import Tittle from '../components/Tittle'
import Button from '../components/Button'
import { IconFilter, IconFilterFill } from '../components/Icons'
import CategoryImage from '../components/CategoryImage'
import ContainerLink from '../components/ContainerLink'
import { categories } from '../infraestructure/categories'

export default function Catalog() {
  return (
    <section className="p-4 bg-white">
      <div className="grid grid-cols-3">
        <Tittle className="col-start-2" name="Catalog" />
        <Button className="bg-general-blue self-center shadow-lg rounded-xl">
          <IconFilter size="24px" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 place-items-center">
        {categories.map(({ image, name, route }) => (
          <ContainerLink route={route}>
            <CategoryImage image={image} name={name} />
          </ContainerLink>
        ))}
      </div>
    </section>
  )
}
