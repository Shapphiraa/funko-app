import { FormEvent } from 'react'
import Form from '../library/Form'
import Input from '../library/Input'
import Title from '../library/Title'
import GeneralButton from './GeneralButton'
import updateUserPhoneNumber from '../logic/updateUserPhoneNumber'
import { User } from '../logic/retrieveUser'
import useAppContext from '../hooks/useAppContext'
import { addEspace } from '../helpers/addSpace'

export default function UpdatePhoneNumberForm({
  onUpdated,
  user,
}: {
  user: User
  onUpdated: () => void
}) {
  const { alert } = useAppContext()

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
      alert(error.message)
    }
  }

  return (
    <>
      <Title className="text-xl" name="Update phone"></Title>

      <Form onSubmit={handleUpdate}>
        <Input
          type="text"
          name="phoneNumber"
          defaultValue={
            user.phoneNumber
              ? user.phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
              : ''
          }
        />

        <GeneralButton title="Update" />
      </Form>
    </>
  )
}
