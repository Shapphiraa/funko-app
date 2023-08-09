'use client'

import Container from '../../../library/Container'
import Carousel from '../../../library/Carousel'
import ProductImage from '../../../components/ProductImage'
import GeneralButton from '../../../components/GeneralButton'
import CharacteristicsList from '../../../components/CharacteristicsList'
import BackArrow from '../../../components/BackArrow'
import {
  IconBookmark,
  IconBookmarkFill,
  IconHeart,
  IconHeartFill,
  IconArrowLeft,
} from '../../../components/Icons'
import retrievePop from '@/app/logic/retrievePop'
import { Pop } from '../../../logic/retrievePop'
import { useState, useEffect } from 'react'

export default function Detail({ params }: { params: { id: string } }) {
  const [pop, setPop] = useState<Pop>()

  const getPop = async () => {
    let pop = await retrievePop(params)

    setPop(pop)
  }

  useEffect(() => {
    getPop()
  }, [])

  if (pop) {
    return (
      <>
        <div className="p-4">
          <BackArrow></BackArrow>
        </div>

        <Container className="m-5 mt-0 p-5">
          <Carousel>
            <div className="h-full w-full !flex justify-center">
              <ProductImage
                image={pop.images[0]}
                name={pop.name}
                size={250}
              ></ProductImage>
            </div>
            <div className="h-full w-full !flex justify-center">
              <ProductImage
                image={pop.images[1]}
                name={pop.name}
                size={250}
              ></ProductImage>
            </div>
          </Carousel>

          <h1 className="text-text-product-light text-3xl font-light mb-1 mt-10">
            {pop.variant}
          </h1>
          <h2 className="text-text-product-light text-2xl font-semibold">
            {pop.name}
          </h2>

          <div className="flex flex-col gap-3 py-10">
            <GeneralButton
              icon={<IconBookmark size="25px" />}
              tittle="Add to Collection"
            ></GeneralButton>
            <GeneralButton
              icon={<IconHeart size="25px" />}
              tittle="Add to Whislist"
            ></GeneralButton>
          </div>

          <CharacteristicsList pop={pop} />
        </Container>
      </>
    )
  }
}
