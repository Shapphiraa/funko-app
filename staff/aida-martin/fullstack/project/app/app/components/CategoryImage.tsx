import Image from 'next/image'

export default function CategoryImage({
  image,
  name,
}: {
  image: string
  name: string
}) {
  return (
    <Image
      className="align-center shadow-lg"
      src={image}
      alt={name}
      width="170"
      height="170"
      quality="100"
      priority
    />
  )
}
