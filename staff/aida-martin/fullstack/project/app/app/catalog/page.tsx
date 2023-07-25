import Tittle from '../components/Tittle'
import Button from '../components/Button'
import { IconFilter, IconFilterFill } from '../components/Icons'
import CategoryImage from '../components/CategoryImage'

const images = [
  {
    image: '/categories/Disney.svg',
    name: 'Disney',
  },
  {
    image: '/categories/Harry-Potter.svg',
    name: 'Harry-Potter',
  },
  {
    image: '/categories/Games.svg',
    name: 'Games',
  },
  {
    image: '/categories/Anime.svg',
    name: 'Anime',
  },
  {
    image: '/categories/Music.svg',
    name: 'Music',
  },
  {
    image: '/categories/Movies-&-TV.svg',
    name: 'Movies-&-TV',
  },
  {
    image: '/categories/Animation.svg',
    name: 'Animation',
  },
  {
    image: '/categories/Sports.svg',
    name: 'Sports',
  },
]

export default function Catalog() {
  return (
    <section className="p-4 bg-white">
      <div className="grid grid-cols-3">
        <Tittle className="col-start-2" name="Catalog" />
        <Button className="self-center shadow-lg">
          <IconFilter size="24px" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 place-items-center">
        {images.map(({ image, name }) => (
          <CategoryImage image={image} name={name} />
        ))}
      </div>
    </section>
  )
}
