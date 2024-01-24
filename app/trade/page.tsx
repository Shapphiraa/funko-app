'use client'

import { useEffect, useState } from 'react'
import PopSales from '../components/PopSales'
import MenuHeader from '../components/MenuHeader'
import isUserLoggedIn from '../logic/isUserLoggedIn'
import SalePopModal from '../components/Modals/SalePopModal'

export default function Trade() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  useEffect(() => {
    if (isUserLoggedIn()) {
      setIsLogged(true)
      return
    }

    setIsLogged(false)
  }, [])

  return (
    <>
      {!isOpenModal && (
        <section className="py-4 bg-white">
          <MenuHeader
            name="Pops for sale"
            permission={isLogged}
            text="New"
            onClick={handleOpenModal}
          />
          <PopSales className="mt-3 px-4" />
        </section>
      )}

      {isOpenModal && isLogged && (
        <section className="p-4 bg-white">
          <SalePopModal
            onSubmit={handleCloseModal}
            onCancel={handleCloseModal}
            onCreate={true}
          />
        </section>
      )}
    </>
  )
}
