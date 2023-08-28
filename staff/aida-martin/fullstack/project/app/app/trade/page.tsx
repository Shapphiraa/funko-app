'use client'

import { useState } from 'react'
import CreateSalePopModal from '../components/Modals/CreateSalePopModal'
import PopSales from '../components/PopSales'
import Tittle from '../library/Tittle'
import Button from '../library/Button'
import GeneralButton from '../components/GeneralButton'
import MenuHeader from '../components/MenuHeader'

export default function Trade() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  return (
    <>
      {!isOpenModal && (
        <section className="py-4 bg-white">
          <MenuHeader
            name="Pops for sale"
            permission={true}
            text="New"
            onClick={handleOpenModal}
          />
          <PopSales className="mt-3 px-4" />
        </section>
      )}

      {isOpenModal && (
        <section className="p-4 bg-white">
          <CreateSalePopModal
            onSubmit={handleCloseModal}
            onCancel={handleCloseModal}
          />
        </section>
      )}
    </>
  )
}
