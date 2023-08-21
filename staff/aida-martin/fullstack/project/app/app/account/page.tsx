'use client'

import { redirect, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import isUserLoggedIn from '../logic/isUserLoggedIn'
import retrieveUser from '../logic/retrieveUser'
import { User } from '../logic/retrieveUser'
import Tittle from '../library/Tittle'
import Image from 'next/image'
import UserPersonalInfo from '../components/UserPersonalInfo'
import { IconEdit } from '../components/Icons'
import GeneralButton from '../components/GeneralButton'
import logoutUser from '../logic/logoutUser'
import Button from '../library/Button'
import UpdatePersonalInfoModal from '../components/Modals/UpdatePersonalInfoModal'

import {
  FIELD_LOCATION,
  FIELD_EMAIL,
  FIELD_NAME,
  FIELD_PASSWORD,
  FIELD_PHONE,
  FieldType,
  PersonalInfo,
} from '../../types.d'
import CreatePopModal from '../components/Modals/CreatePopModal'

export default function Account() {
  const [user, setUser] = useState<User>()
  const [fieldToEdit, setFieldToEdit] = useState<FieldType | null>(null)
  const [adminModal, setAdminModal] = useState<boolean>(false)

  const getUser = async () => {
    const user = await retrieveUser()

    setUser(user)
  }

  const router = useRouter()

  const handleLogout = () => {
    try {
      logoutUser()

      router.push('/')
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleOpenModal = (field: FieldType) => {
    setFieldToEdit(field)
  }

  const handleCloseModal = () => {
    setFieldToEdit(null)
    setAdminModal(false)
  }

  const handleOpenAdminModal = () => {
    setAdminModal(true)
  }

  useEffect(() => {
    if (!isUserLoggedIn()) redirect('/account/login')
  }, [])

  useEffect(() => {
    getUser()
  }, [fieldToEdit])

  if (!user) return

  const personalInfo: PersonalInfo[] = [
    {
      label: 'Name:',
      value: user.name,
      field: FIELD_NAME,
    },
    {
      label: 'Email:',
      value: user.email,
      field: FIELD_EMAIL,
    },
    {
      label: 'Phone number:',
      value: user.phoneNumber
        ? user.phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
        : 'No data',
      field: FIELD_PHONE,
    },
    {
      label: 'Location:',
      value: user.location ? user.location : 'No data',
      field: FIELD_LOCATION,
    },
  ]

  return (
    <section className="p-8 bg-white">
      <Image
        className="rounded-full object-fit p-1 mt-2 mb-7 mx-auto shadow-2xl"
        src={user.avatar}
        alt="avatar"
        width={120}
        height={120}
      />
      <Tittle className="text-xl font-semibold mb-4" name="Personal Info" />
      {personalInfo.map(({ label, value, field }) => (
        <UserPersonalInfo
          label={label}
          value={value}
          onEdit={() => {
            handleOpenModal(field)
          }}
          key={label}
        />
      ))}

      <Tittle className="text-xl font-semibold mt-7 mb-4" name="Settings" />
      <div className="flex place-content-between items-center py-2 text-general-blue">
        <p className="text-lg text-text-light font-medium">Password</p>
        <Button
          onClick={() => {
            handleOpenModal(FIELD_PASSWORD)
          }}
        >
          <IconEdit size="24px" />
        </Button>
      </div>

      {fieldToEdit && (
        <UpdatePersonalInfoModal
          onUpdated={handleCloseModal}
          onCancel={handleCloseModal}
          field={fieldToEdit}
          user={user}
        />
      )}

      {user.role === 'admin' && (
        <>
          <Tittle
            className="text-xl font-semibold mt-7 mb-4"
            name="Administrator options"
          />

          <div className="flex place-content-between items-center py-2 text-general-blue">
            <p className="text-lg text-text-light font-medium">Add pop</p>
            <GeneralButton
              className="px-4"
              tittle="Add"
              onClick={handleOpenAdminModal}
            />
          </div>

          {adminModal && (
            <CreatePopModal
              onCreated={handleCloseModal}
              onCancel={handleCloseModal}
            />
          )}
        </>
      )}

      <GeneralButton
        className="w-full my-6"
        tittle="Log out"
        onClick={handleLogout}
      />
    </section>
  )
}
