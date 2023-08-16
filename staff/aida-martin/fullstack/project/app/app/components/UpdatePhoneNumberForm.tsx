import { FormEvent, useState } from 'react'
import Form from '../library/Form'
import Input from '../library/Input'
import Tittle from '../library/Tittle'
import GeneralButton from './GeneralButton'
import updateUserPhoneNumber from '../logic/updateUserPhoneNumber'
import { User } from '../logic/retrieveUser'

export default function UpdatePhoneNumberForm({
  onUpdated,
  user,
}: {
  user: User
  onUpdated: () => void
}) {
  const addEspace = (numbers: string) =>
    Array.from(numbers).reduce((acc, t, i) => {
      if (i > 0 && i % 3 == 0) acc += ' '
      acc += t
      return acc
    })

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      phoneNumber: { value: string }
    }

    const phoneNumber = (target.phoneNumber.value = addEspace(
      target.phoneNumber.value.replaceAll(' ', '')
    ))

    try {
      await updateUserPhoneNumber({
        phoneNumber,
      })
      onUpdated()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <>
      <Tittle className="text-xl" name="Update phone"></Tittle>

      <Form onSubmit={handleUpdate}>
        <Input
          type="text"
          name="phoneNumber"
          placeholder={
            user.phoneNumber
              ? user.phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
              : 'Your phone number'
          }
        />

        <GeneralButton tittle="Update" />
      </Form>
    </>
  )
}
