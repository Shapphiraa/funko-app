import ProductImage from './ProductImage'
import Container from '../library/Container'
import Link from 'next/link'
import Image from 'next/image'

export default function PopForSale({
  salePop,
}: {
  salePop: {
    id: string
    author: {
      id: string
      name: string
      avatar: string
    }
    tittle: string
    images: Array<string>
    price: number
  }
}) {
  return (
    <Container className="py-5 px-2">
      <div className="flex gap-1 items-center p-2">
        <Image
          className="rounded-full w-[30px] h-[30px] object-cover shadow-2xl"
          src={salePop.author.avatar}
          alt={salePop.tittle}
          width={30}
          height={30}
        />
        <p className="text-sm">{salePop.author.name}</p>
      </div>
      <Link
        className="flex flex-col items-center"
        href={`/trade/${salePop.id}`}
      >
        <ProductImage
          image={salePop.images[0]}
          name={salePop.tittle}
          size={130}
          className="w-[130px] h-[130px]"
        />
      </Link>
      <h1 className="textext-text-product-light mx-2 text-[13px] font-semibold leading-none mt-3 mb-1 truncate ...">
        {salePop.tittle}
      </h1>
      <h2 className="text-general-blue mx-2 text-xl font-bold leading-none">
        {`${salePop.price}€`}
      </h2>
    </Container>
  )
}
