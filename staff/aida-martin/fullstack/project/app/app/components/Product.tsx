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
    <div className="flex flex-col bg-white rounded-2xl drop-shadow-lg p-2">
      <ProductImage image={image} name={name} />
      <h1 className="mt-1 mx-2">{type}</h1>
      <h2 className="mx-2 text-[13px] font-semibold leading-none mb-3">
        {name}
      </h2>
      <GeneralButtons />
    </div>
  )
}
