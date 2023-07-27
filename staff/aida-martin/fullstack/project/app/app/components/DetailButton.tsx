import Button from './Button'
import { IconBookmark, IconHeart } from './Icons'

export default function DetailButton({
  icon,
  tittle,
}: {
  icon: JSX.Element
  tittle: string
}) {
  return (
    <Button className="bg-general-blue rounded-3xl justify-center shadow-lg gap-2">
      {icon}
      <span className="text-white text-lg">{tittle}</span>
    </Button>
  )
}
