'use client'

import Container from '../../../library/Container'
import Carousel from '../../../library/Carousel'
import ProductImage from '../../../components/ProductImage'
import CharacteristicsList from '../../../components/CharacteristicsList'
import BackArrow from '../../../components/BackArrow'
import AddToListsButtonsDetail from '@/app/components/AddToListsButtonsDetail'
import retrievePop from '@/app/logic/retrievePop'
import retrieveUserRole from '../../../logic/retrieveUserRole'
import { Pop } from '../../../logic/retrievePop'
import { useState, useEffect } from 'react'
import isUserLoggedIn from '@/app/logic/isUserLoggedIn'
import { IconEdit, IconDelete } from '@/app/components/Icons'
import Button from '@/app/library/Button'
import UpdatePopModal from '@/app/components/Modals/UpdatePopModal'
import deletePop from '@/app/logic/deletePop'
import { useRouter } from 'next/navigation'

export default function Detail({ params }: { params: { id: string } }) {
  const [pop, setPop] = useState<Pop>()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const router = useRouter()

  const getPop = async () => {
    let pop = await retrievePop(params)

    setPop(pop)
  }

  const getUserRole = async () => {
    const userRole = await retrieveUserRole()

    userRole === 'admin' ? setIsAdmin(true) : setIsAdmin(false)
  }

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleDeletePop = async () => {
    // Change to custom modal
    if (
      confirm(
        'Are you sure you want to delete? All of sale pops will be deleted too'
      )
    ) {
      await deletePop(params)

      router.back()
    }
  }

  useEffect(() => {
    if (isUserLoggedIn()) {
      getUserRole()
      return
    }
    setIsAdmin(false)
  }, [])

  useEffect(() => {
    getPop()
  }, [isOpenModal])

  return (
    <>
      {pop && (
        <>
          {!isOpenModal && (
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
                      className="w-[250px] h-[250px]"
                    ></ProductImage>
                  </div>
                  <div className="h-full w-full !flex justify-center">
                    <ProductImage
                      image={pop.images[1]}
                      name={pop.name}
                      size={250}
                      className="w-[250px] h-[250px]"
                    ></ProductImage>
                  </div>
                </Carousel>

                <h1 className="text-text-product-light text-3xl font-light mb-1 mt-10">
                  {pop.variant}
                </h1>
                <h2 className="text-text-product-light text-2xl font-semibold">
                  {pop.name}
                </h2>

                <AddToListsButtonsDetail pop={pop} onChange={getPop} />

                <CharacteristicsList pop={pop} />

                <>
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
                </>
              </Container>
            </>
          )}

          {isOpenModal && (
            <div className="p-4 bg-white">
              <UpdatePopModal
                pop={pop}
                onSubmit={handleCloseModal}
                onCancel={handleCloseModal}
              ></UpdatePopModal>
            </div>
          )}
        </>
      )}
    </>
  )
}
