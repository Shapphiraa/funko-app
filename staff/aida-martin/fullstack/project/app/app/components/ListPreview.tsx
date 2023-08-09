import Container from '../library/Container'
import Image from 'next/image'

interface ListPreviewProps {
  icon: JSX.Element
  tittle: string
  quantity: number
  subtittle: string
  image: string
  color: string
}

export default function ListPreview({
  icon,
  tittle,
  quantity,
  subtittle,
  image,
  color,
}: ListPreviewProps) {
  return (
    <Container className={`p-5 ${color}`}>
      <h2 className="text-text-light text-xl font-semibold">{tittle}</h2>
      <div className="grid grid-cols-2 place-items-center">
        <div className="flex flex-col items-center p-10">
          {icon}
          <h3 className="text-text-light text-4xl font-bold">{quantity}</h3>
        </div>
        <div className="flex flex-col items-center p-2">
          <h3 className="text-text-light text-lg font-normal">{subtittle}</h3>
          <div>
            <Image
              src={image}
              alt="Preview"
              width="130"
              height="130"
              quality="100"
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
