import Characteristic from './Characteristic'

const pop = {
  variant: 'POP!',
  exclusivity: 'Exclusive',
  name: 'STITCH WITH TURTLE',
  image: '/pops/Stitch-With-Turtle-Lilo-And-Stitch.webp',
  category: 'Disney',
  collect: 'Lilo & Stitch',
  release: '2023',
  status: 'Coming Soon',
  trendingValue: '30€',
}

export default function CharacteristicsList() {
  return (
    <ul className="flex flex-col gap-2">
      <Characteristic
        name="Category:"
        value={`${pop.category}`}
      ></Characteristic>
      <Characteristic
        name="Collection:"
        value={`${pop.collect}`}
      ></Characteristic>
      <Characteristic
        name="Type:"
        value={`${pop.exclusivity}`}
      ></Characteristic>
      <Characteristic name="Release:" value={`${pop.release}`}></Characteristic>
      <Characteristic name="Status:" value={`${pop.status}`}></Characteristic>
      <Characteristic
        name="Trending value:"
        value={`${pop.trendingValue}`}
      ></Characteristic>
    </ul>
  )
}
