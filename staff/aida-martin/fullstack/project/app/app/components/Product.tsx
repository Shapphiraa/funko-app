import AddToListsButtons from './AddToListsButtons'
import ProductImage from './ProductImage'
import Container from '../library/Container'
import Link from 'next/link'

export default function Product({
  pop,
  onChange,
}: {
  pop: {
    id: string
    variant: string
    name: string
    images: Array<string>
    userCollect: boolean
    userWhislist: boolean
  }
  onChange: () => void
}) {
  return (
    <Container className="py-5 px-2">
      <Link
        className="flex flex-col items-center"
        href={`/catalog/pop/${pop.id}`}
      >
        <ProductImage
          image={pop.images[0]}
          name={pop.name}
          size={130}
          className="w-[130px] h-[130px]"
        />
      </Link>
      <h1 className="text-text-product-light mt-1 mx-2 font-light">
        {pop.variant}
      </h1>
      <h2 className="text-text-product-light mx-2 text-[13px] font-semibold leading-none mb-3">
        {pop.name}
      </h2>
      <AddToListsButtons pop={pop} onChange={onChange} />
    </Container>
  )
}
