import Characteristic from './Characteristic'
import { PopForSale } from '../logic/retrieveSalePop'

export default function SalePopCharacteristicsList({
  salePop,
}: {
  salePop: PopForSale
}) {
  return (
    <ul className="flex flex-col gap-2">
      <Characteristic
        name="Condition:"
        value={salePop.condition}
      ></Characteristic>
      <Characteristic
        name="Category:"
        value={salePop.pop.category.name}
      ></Characteristic>
      <Characteristic
        name="Collection:"
        value={salePop.pop.collect}
      ></Characteristic>
      <Characteristic
        name="Exclusivity:"
        value={salePop.pop.exclusivity}
      ></Characteristic>
      <Characteristic
        name="Number:"
        value={salePop.pop.number}
      ></Characteristic>

      <Characteristic
        name="Publication date:"
        value={salePop.date}
      ></Characteristic>
    </ul>
  )
}
