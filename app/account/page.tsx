'use client'

import { redirect, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
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
import updateUserAvatar from '../logic/updateUserAvatar'

import {
  FIELD_LOCATION,
  FIELD_EMAIL,
  FIELD_NAME,
  FIELD_PASSWORD,
  FIELD_PHONE,
  FieldType,
  PersonalInfo,
} from '../../types.d'
import { IKContext, IKUpload } from 'imagekitio-react'
import {
  urlEndpoint,
  publicKey,
  authenticationEndpoint,
} from '../infrastructure'
import PopSales from '../components/PopSales'
import useAppContext from '../hooks/useAppContext'

export default function Account() {
  const { alert } = useAppContext()

  const [user, setUser] = useState<User>()
  const [fieldToEdit, setFieldToEdit] = useState<FieldType | null>(null)

  const [image, setImage] = useState<boolean>(false)

  const imageRef = useRef<HTMLInputElement>(null)

  const getUser = async () => {
    try {
      const user = await retrieveUser()

      setUser(user)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const router = useRouter()

  const handleLogout = () => {
    logoutUser()

    router.push('/')
  }

  const handleOpenModal = (field: FieldType) => {
    setFieldToEdit(field)
  }

  const handleCloseModal = () => {
    setFieldToEdit(null)
  }

  useEffect(() => {
    if (!isUserLoggedIn()) redirect('/account/login')
  }, [])

  useEffect(() => {
    getUser()
  }, [fieldToEdit, image])

  const onError = (err: any) => {
    console.log('Error', err)
  }

  const onSuccessImage = async (res: any) => {
    try {
      await updateUserAvatar({
        avatar: res.url,
      })

      handleCloseModal()
      setImage(!image)
    } catch (error: any) {
      alert(error.message)
    }
  }

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
    <>
      <section className="relative p-8 bg-white">
        <Image
          className="mx-auto rounded-full w-[140px] h-[140px] mt-1 mb-7 object-cover p-1 shadow-2xl"
          src={user.avatar}
          alt="avatar"
          width={140}
          height={140}
          onClick={() => {
            imageRef.current!.click()
          }}
        />

        {/* @ts-ignore */}
        <IKContext
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticationEndpoint={authenticationEndpoint}
        >
          {/* @ts-ignore */}
          <IKUpload
            inputRef={imageRef}
            onError={onError}
            onSuccess={onSuccessImage}
            hidden
          />
        </IKContext>

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

        <GeneralButton
          className="w-full my-6"
          tittle="Log out"
          onClick={handleLogout}
        />
        <hr className="bg-text-light"></hr>

        <Tittle className="text-xl font-semibold mt-7" name="Your sale pops" />
        <PopSales user={user} className="mt-2" />
      </section>

      {fieldToEdit && (
        <UpdatePersonalInfoModal
          onUpdated={handleCloseModal}
          onCancel={handleCloseModal}
          field={fieldToEdit}
          user={user}
        />
      )}
    </>
  )
}
