'use client'

import Image from 'next/image'
import MenuHeader from '../../components/MenuHeader'
import Products from '../../components/Products'
import { useEffect, useState } from 'react'
import CreatePopModal from '@/app/components/Modals/CreatePopModal'
import retrieveUserRole from '@/app/logic/retrieveUserRole'
import isUserLoggedIn from '@/app/logic/isUserLoggedIn'

export default function AllCatalogPage() {
  const [adminModal, setAdminModal] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const getUserRole = async () => {
    try {
      const userRole = await retrieveUserRole()

      userRole === 'admin' ? setIsAdmin(true) : setIsAdmin(false)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (isUserLoggedIn()) {
      getUserRole()
      return
    }

    setIsAdmin(false)
  }, [])

  const handleCloseModal = () => {
    setAdminModal(false)
  }

  const handleOpenAdminModal = () => {
    setAdminModal(true)
  }

  return (
    <>
      {!adminModal && (
        <section className="pt-4 bg-white">
          <MenuHeader
            name="Catalog"
            route="/catalog"
            isAdmin={isAdmin}
            text="Add"
            onClick={handleOpenAdminModal}
          />

          <Image
            className="shadow-lg"
            src="/categories/All-Catalog.svg"
            alt="All-Catalog"
            width={0}
            height={0}
            style={{ width: '100%', height: '200' }}
            quality="100"
          ></Image>

          <Products className="p-4" />
        </section>
      )}

      {adminModal && (
        <section className="p-4 bg-white">
          <CreatePopModal
            onSubmit={handleCloseModal}
            onCancel={handleCloseModal}
          />
        </section>
      )}
    </>
  )
}
