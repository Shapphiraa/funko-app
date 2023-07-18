import GeneralButtons from './GeneralButtons'
import ProductImage from './ProductImage'

export default function Product({
  image,
  type,
  name,
}: {
  image: string
  type: string
  name: string
}) {
  return (
    <div className="flex flex-col bg-white h-[265px] rounded-2xl drop-shadow-lg p-2">
      <ProductImage image={image} name={name} />
      <h1 className="mt-1 mx-2">{type}</h1>
      <h2 className="mx-2 text-sm font-medium leading-none">{name}</h2>
      <GeneralButtons />
    </div>
  )
}
