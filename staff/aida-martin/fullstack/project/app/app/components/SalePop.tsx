import ProductImage from './ProductImage'
import Container from '../library/Container'
import Link from 'next/link'
import Image from 'next/image'
import { IconBookmarkFill } from './Icons'

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
    pop: {
      name: string
    }
    images: Array<string>
    price: number
    status: string
  }
}) {
  return (
    <Container className="py-5 px-2">
      <div className="flex gap-1 items-center p-2 relative">
        <Image
          className="rounded-full w-[30px] h-[30px] object-cover shadow-2xl"
          src={salePop.author.avatar}
          alt={salePop.pop.name}
          width={30}
          height={30}
        />
        <p className="text-sm">{`@${salePop.author.name
          .toLowerCase()
          .replace(' ', '')}`}</p>
      </div>
      <Link
        className="flex flex-col items-center"
        href={`/trade/${salePop.id}`}
      >
        <div className="relative">
          {salePop.status === 'Reserved' && (
            <div className="absolute text-general-blue top-[7px] right-[7px]">
              <IconBookmarkFill
                className=" bg-white rounded-xl p-1"
                size="25px"
              ></IconBookmarkFill>
            </div>
          )}
          <ProductImage
            image={salePop.images[0]}
            name={salePop.pop.name}
            size={130}
            className="w-[130px] h-[130px]"
          />
        </div>
      </Link>
      <h1 className="textext-text-product-light mx-2 text-[13px] font-semibold leading-none mt-3 mb-1 truncate ...">
        {salePop.pop.name}
      </h1>
      <h2 className="text-general-blue mx-2 text-xl font-bold leading-none">
        {`${salePop.price}€`}
      </h2>
    </Container>
  )
}
