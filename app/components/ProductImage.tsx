import Image from 'next/image'

export default function ProductImage({
  image,
  name,
  size,
  className,
}: {
  image: string
  name: string
  size: number
  className: string
}) {
  return (
    <Image
      className={`self-center rounded-xl object-cover ${className}`}
      src={image}
      alt={name}
      width={size}
      height={size}
      quality="100"
    />
  )
}
