import Tittle from './Tittle'
import Button from './Button'
import BackArrow from './BackArrow'
import { IconFilter } from './Icons'

export default function MenuHeader({
  name,
  route,
}: {
  name: string
  route?: string
}) {
  return (
    <div className="px-4 grid grid-cols-[36px_1fr_36px] mb-3">
      {route && <BackArrow />}
      <Tittle className="col-start-2" name={name} />
      <Button className="bg-general-blue self-center shadow-lg rounded-xl">
        <IconFilter size="24px" />
      </Button>
    </div>
  )
}
