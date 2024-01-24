import Characteristic from './Characteristic'
import { Pop } from '../logic/retrievePop'

export default function CharacteristicsList({ pop }: { pop: Pop }) {
  return (
    <ul className="flex flex-col gap-2">
      <Characteristic
        name="Category:"
        value={`${pop.category.name}`}
      ></Characteristic>
      <Characteristic
        name="Collection:"
        value={`${pop.collect}`}
      ></Characteristic>
      <Characteristic name="Number:" value={`${pop.number}`}></Characteristic>
      <Characteristic
        name="Type:"
        value={`${pop.exclusivity}`}
      ></Characteristic>
      <Characteristic name="Release:" value={`${pop.release}`}></Characteristic>
      <Characteristic
        name="Status:"
        value={`${pop.availability}`}
      ></Characteristic>
      <Characteristic
        name="Trending value:"
        value={pop.trendingValue ? `${pop.trendingValue}€` : 'No data yet'}
      ></Characteristic>
    </ul>
  )
}
