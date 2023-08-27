'use client'

import Container from '../../library/Container'
import Carousel from '../../library/Carousel'
import ProductImage from '../../components/ProductImage'
import CharacteristicsList from '../../components/CharacteristicsList'
import BackArrow from '../../components/BackArrow'
import retrieveSalePop from '@/app/logic/retrieveSalePop'
// import retrieveUserRole from '../../logic/retrieveUserRole'
import { PopForSale } from '../../logic/retrieveSalePop'
import { useState, useEffect } from 'react'
import isUserLoggedIn from '@/app/logic/isUserLoggedIn'
import { IconEdit, IconDelete } from '@/app/components/Icons'
import Button from '@/app/library/Button'
// import UpdatePopModal from '@/app/components/Modals/UpdatePopModal'
// import deletePop from '@/app/logic/deletePop'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import SalePopCharacteristicsList from '@/app/components/SalePopCharacteristicsList'

export default function Detail({ params }: { params: { id: string } }) {
  const [salePop, setSalePop] = useState<PopForSale>()
  // const [isAdmin, setIsAdmin] = useState<boolean>(false)
  // const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const router = useRouter()

  const getPopForSale = async () => {
    let salePop = await retrieveSalePop(params)

    setSalePop(salePop)
  }

  // const handleOpenModal = () => {
  //   setIsOpenModal(true)
  // }

  // const handleCloseModal = () => {
  //   setIsOpenModal(false)
  // }

  // const handleDeletePop = async () => {
  //   // Change to custom modal
  //   if (confirm('Are you sure you want to delete?')) {
  //     await deletePop(params)

  //     router.back()
  //   }
  // }

  // useEffect(() => {
  //   if (isUserLoggedIn()) {
  //     getUserRole()
  //     return
  //   }
  //   setIsAdmin(false)
  // }, [])

  useEffect(() => {
    getPopForSale()
  }, [])

  return (
    <>
      {salePop && (
        <>
          <div className="p-4">
            <BackArrow></BackArrow>
          </div>

          <Container className="m-5 mt-0 px-5 pb-5">
            <div className="flex gap-1 items-center py-3 text-[15px] text-text-light">
              <Image
                className="rounded-full w-[30px] h-[30px] object-cover shadow-2xl"
                src={salePop.author.avatar}
                alt={salePop.tittle}
                width={50}
                height={50}
              />
              <p className="text-lg font-semibold">{salePop.author.name}</p>
            </div>
            <Carousel>
              <div className="h-full w-full !flex justify-center">
                <ProductImage
                  image={salePop.images[0]}
                  name={salePop.tittle}
                  size={290}
                  className="w-[290px] h-[250px]"
                ></ProductImage>
              </div>
              <div className="h-full w-full !flex justify-center">
                <ProductImage
                  image={salePop.images[1]}
                  name={salePop.tittle}
                  size={290}
                  className="w-[290px] h-[250px]"
                ></ProductImage>
              </div>
            </Carousel>

            <div className="flex flex-col gap-1 mt-7 text-text-product-light">
              <span className="text-3xl text-general-blue font-bold">{`${salePop.price}€`}</span>

              <h1 className="text-2xl font-light">{salePop.pop.variant}</h1>
              <h2 className="text-xl font-semibold">{salePop.tittle}</h2>

              <p className="text-justify text-xl my-7">{salePop.description}</p>
            </div>

            <SalePopCharacteristicsList salePop={salePop} />

            {/* <>
                  {isAdmin && (
                    <>
                      <div className="flex justify-center gap-1 mt-4 text-general-blue">
                        <Button
                          className="bg-white rounded-2xl"
                          onClick={handleOpenModal}
                        >
                          <IconEdit size="24px" />
                        </Button>
                        <Button
                          className="bg-white rounded-2xl"
                          onClick={handleDeletePop}
                        >
                          <IconDelete size="24px" />
                        </Button>
                      </div>
                    </>
                  )}
                </> */}
          </Container>
        </>
      )}

      {/* {isOpenModal && (
            <div className="p-4 bg-white">
              <UpdatePopModal
                pop={pop}
                onSubmit={handleCloseModal}
                onCancel={handleCloseModal}
              ></UpdatePopModal>
            </div>
          )} */}
    </>
  )
}
