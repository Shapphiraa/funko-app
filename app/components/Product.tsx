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
          size={200}
          className="w-[130px] h-[130px] lg:w-[200px] lg:h-[200px]"
        />
      </Link>
      <h1 className="text-text-product-light mt-1 mx-2 font-light lg:text-xl">
        {pop.variant}
      </h1>
      <Link href={`/catalog/pop/${pop.id}`}>
      <h2 className="text-text-product-light mx-2 text-[13px] font-semibold leading-5 mb-3 lg:text-base">
        {pop.name}
      </h2>
      </Link>
      <AddToListsButtons pop={pop} onChange={onChange} />
    </Container>
  )
}
