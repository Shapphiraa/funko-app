'use client'

import Container from '../../components/Container'
import Carousel from '../../components/Carousel'
import ProductImage from '../../components/ProductImage'
import DetailButton from '../../components/DetailButton'
import Button from '../../components/Button'
import CharacteristicsList from '../../components/CharacteristicsList'
import Link from 'next/link'
import { useState } from 'react'
import {
  IconBookmark,
  IconBookmarkFill,
  IconHeart,
  IconHeartFill,
  IconArrowLeft,
  IconCircleFill,
  IconCircle,
} from '../../components/Icons'

const pop = {
  type: 'POP!',
  name: 'STITCH WITH TURTLE',
  image: '/pops/Stitch-With-Turtle-Lilo-And-Stitch.webp',
  boxImage: '/pops/Stitch-With-Turtle-Box-Lilo-And-Stitch.webp',
}

export default function Detail() {
  const [image, setImage] = useState('left')

  const handleChangeAtFirstImage = () => {
    setImage('left')
  }

  const handleChangeAtSecondImage = () => {
    setImage('right')
  }

  return (
    <>
      <Link href="/catalog">
        <Button className="text-general-blue mt-2 ml-3">
          <IconArrowLeft size="27px"></IconArrowLeft>
        </Button>
      </Link>

      <Container className="m-5 mt-2 p-7">
        <Carousel>
          <ProductImage
            image={pop.image}
            name={pop.name}
            size={250}
          ></ProductImage>
          <ProductImage
            image={pop.boxImage}
            name={pop.name}
            size={250}
          ></ProductImage>
        </Carousel>

        {/* <div className="flex mt-1 gap-1 justify-center">
          <button
            className={
              image === 'right'
                ? 'bg-[#8CC4F6] rounded-full p-[6px] shadow-lg'
                : 'bg-general-blue rounded-full p-[6px] shadow-lg'
            }
            onClick={handleChangeAtFirstImage}
          ></button>
          <button
            className={
              image === 'left'
                ? 'bg-[#8CC4F6] rounded-full p-[6px] shadow-lg'
                : 'bg-general-blue rounded-full p-[6px] shadow-lg'
            }
            onClick={handleChangeAtSecondImage}
          ></button>
        </div> */}

        <h1 className="text-text-product-light text-3xl font-light mb-1 mt-3">
          {pop.type}
        </h1>
        <h2 className="text-text-product-light text-2xl font-semibold">
          {pop.name}
        </h2>

        <div className="flex flex-col gap-3 py-10">
          <DetailButton
            icon={<IconBookmark size="25px" />}
            tittle="Add to Collection"
          ></DetailButton>
          <DetailButton
            icon={<IconHeart size="25px" />}
            tittle="Add to Whislist"
          ></DetailButton>
        </div>

        <CharacteristicsList />
      </Container>
    </>
  )
}
