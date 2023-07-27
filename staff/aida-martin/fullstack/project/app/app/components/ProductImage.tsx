import Image from 'next/image'

export default function ProductImage({
  image,
  name,
  size,
}: {
  image: string
  name: string
  size: number
}) {
  return (
    <Image
      className="self-center"
      src={image}
      alt={name}
      width={size}
      height={size}
      quality="100"
    />
  )
}
