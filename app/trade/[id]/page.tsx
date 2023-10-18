'use client'

import Container from '../../library/Container'
import Carousel from '../../library/Carousel'
import ProductImage from '../../components/ProductImage'
import BackArrow from '../../components/BackArrow'
import retrieveSalePop from '@/app/logic/retrieveSalePop'
import { PopForSale } from '../../logic/retrieveSalePop'
import { useState, useEffect } from 'react'
import isUserLoggedIn from '@/app/logic/isUserLoggedIn'
import {
  IconEdit,
  IconDelete,
  IconBookmarkFill,
  IconUnavailable,
} from '@/app/components/Icons'
import Button from '@/app/library/Button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import SalePopCharacteristicsList from '@/app/components/SalePopCharacteristicsList'
import getUserId from '@/app/logic/getUserId'
import UpdateSalePopModal from '@/app/components/Modals/SalePopModal'
import GeneralButton from '@/app/components/GeneralButton'
import ToggleSalePopStatusButton from '@/app/components/ToggleSalePopStatusButton'
import deleteSalePop from '@/app/logic/deleteSalePop'
import ViewUserContactInfoButton from '@/app/components/ViewUserContactInfoButton'
import changeSalePopStatusToSold from '@/app/logic/changeSalePopStatusToSold'
import useAppContext from '@/app/hooks/useAppContext'
import Alert from '@/app/components/Alert'
import Loader from '@/app/components/Loader'

export default function Detail({ params }: { params: { id: string } }) {
  const { alert } = useAppContext()

  const [salePop, setSalePop] = useState<PopForSale | null>(null)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [confirmAlert, setConfirmAlert] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const getPopForSale = async () => {
    try {
      const salePop = await retrieveSalePop(params)

      setSalePop(salePop)
    } catch (error: any) {
      setIsLoading(false)
      alert(error.message)
    }
  }

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleOpenDeleteAlert = () => {
    setConfirmAlert('delete')
  }

  const handleOpenSoldAlert = () => {
    setConfirmAlert('sold')
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)

    getPopForSale()
  }

  const handleCloseAlert = () => {
    setConfirmAlert(null)
  }

  const handleDeleteSalePop = async () => {
    try {
      await deleteSalePop(params)

      router.back()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleSoldSalePop = async () => {
    try {
      await changeSalePopStatusToSold({ id: salePop!.id })

      handleCloseAlert()

      getPopForSale()
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)

    setTimeout(async () => {
      getPopForSale()
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <>
      {!isLoading && salePop && (
        <>
          {!isOpenModal && (
            <>
              <div className="p-4">
                <BackArrow></BackArrow>
              </div>

              <Container className="m-5 mt-0 px-5 pb-5">
                <div className="flex gap-1 items-center py-3 text-[15px] text-text-light">
                  <Image
                    className="rounded-full border-1 w-[37px] h-[37px] object-cover shadow-2xl"
                    src={salePop.author.avatar}
                    alt="avatar"
                    width={50}
                    height={50}
                  />
                  <div>
                    <p className="text-lg font-semibold">{`@${salePop.author.name
                      .toLowerCase()
                      .replace(' ', '')}`}</p>
                    <p className="text-sm">{salePop.author.location}</p>
                  </div>
                </div>
                <Carousel>
                  <div className="h-full max-w-[290px] mx-auto !flex justify-center text-general-blue relative">
                    {salePop.status === 'Reserved' && (
                      <div className="text-general-blue flex items-center absolute bg-white rounded-xl p-1 pr-2 top-[10px] right-[10px]">
                        <IconBookmarkFill size="22px"></IconBookmarkFill>
                        <p>Reserved</p>
                      </div>
                    )}

                    {salePop.status === 'Sold' && (
                      <div className="text-red-700 flex items-center absolute bg-white rounded-xl p-1 pr-2 top-[10px] right-[10px]">
                        <IconUnavailable size="22px"></IconUnavailable>
                        <p>Sold</p>
                      </div>
                    )}

                    <ProductImage
                      image={salePop.images[0]}
                      name={salePop.pop.name}
                      size={290}
                      className="w-[290px] h-[250px]"
                    ></ProductImage>
                  </div>
                  <div className="h-full max-w-[290px] mx-auto !flex justify-center relative">
                    {salePop.status === 'Reserved' && (
                      <div className="text-general-blue flex items-center absolute bg-white rounded-xl p-1 pr-2 top-[10px] right-[10px]">
                        <IconBookmarkFill size="22px"></IconBookmarkFill>
                        <p>Reserved</p>
                      </div>
                    )}

                    {salePop.status === 'Sold' && (
                      <div className="text-red-700 flex items-center absolute bg-white rounded-xl p-1 pr-2 top-[10px] right-[10px]">
                        <IconUnavailable size="22px"></IconUnavailable>
                        <p>Sold</p>
                      </div>
                    )}

                    <ProductImage
                      image={salePop.images[1]}
                      name={salePop.pop.name}
                      size={290}
                      className="w-[290px] h-[250px]"
                    ></ProductImage>
                  </div>
                </Carousel>

                <>
                  {isUserLoggedIn() &&
                    salePop.author.id === getUserId() &&
                    salePop.status !== 'Sold' && (
                      <>
                        <div className="grid grid-cols-2 gap-2 mt-10 text-general-blue">
                          <ToggleSalePopStatusButton
                            salePop={salePop}
                            onChange={getPopForSale}
                          ></ToggleSalePopStatusButton>

                          <GeneralButton
                            className="justify-self-center w-full bg-red-500"
                            tittle="Sold"
                            onClick={handleOpenSoldAlert}
                          ></GeneralButton>
                        </div>
                      </>
                    )}
                </>

                <>
                  {isUserLoggedIn() &&
                    salePop.author.id === getUserId() &&
                    salePop.status !== 'Sold' && (
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
                            onClick={handleOpenDeleteAlert}
                          >
                            <IconDelete size="24px" />
                          </Button>
                        </div>
                      </>
                    )}
                </>

                <div className="flex flex-col gap-1 mt-7 text-text-product-light">
                  <span className="text-3xl text-general-blue font-bold">{`${salePop.price}€`}</span>

                  <h1 className="text-3xl font-light">{salePop.pop.variant}</h1>
                  <h2 className="text-2xl font-semibold">{salePop.pop.name}</h2>

                  <p className="text-justify text-xl my-7">
                    {salePop.description}
                  </p>
                </div>

                <SalePopCharacteristicsList salePop={salePop} />

                <>
                  {isUserLoggedIn() &&
                    salePop.author.id !== getUserId() &&
                    salePop.status === 'Available' && (
                      <>
                        <ViewUserContactInfoButton
                          salePop={salePop}
                        ></ViewUserContactInfoButton>
                      </>
                    )}
                </>
              </Container>
            </>
          )}

          {isOpenModal && (
            <div className="p-4 bg-white">
              <UpdateSalePopModal
                salePop={salePop}
                onSubmit={handleCloseModal}
                onCancel={handleCloseModal}
              ></UpdateSalePopModal>
            </div>
          )}

          {confirmAlert === 'delete' && (
            <Alert
              message="Are you sure you want to delete?"
              onAccept={handleDeleteSalePop}
              onCancel={handleCloseAlert}
            ></Alert>
          )}

          {confirmAlert === 'sold' && (
            <Alert
              message="Are you sure you want to mark it as sold?"
              onAccept={handleSoldSalePop}
              onCancel={handleCloseAlert}
            ></Alert>
          )}
        </>
      )}

      {isLoading && <Loader />}
    </>
  )
}
