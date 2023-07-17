import Image from 'next/image'

export default function ProductImage({
  image,
  name,
}: {
  image: string
  name: string
}) {
  return (
    <Image
      className="self-center"
      src={image}
      alt={name}
      width="120"
      height="120"
      quality="100"
    />
  )
}
