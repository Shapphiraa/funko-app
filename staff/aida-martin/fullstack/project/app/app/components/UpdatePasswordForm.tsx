import { FormEvent } from 'react'
import Form from '../library/Form'
import Input from '../library/Input'
import Tittle from '../library/Tittle'
import GeneralButton from './GeneralButton'
import updateUserPassword from '../logic/updateUserPassword'

export default function UpdatePasswordForm({
  onUpdated,
}: {
  onUpdated: () => void
}) {
  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      password: { value: string }
      newPassword: { value: string }
      newPasswordConfirm: { value: string }
    }

    const password = target.password.value
    const newPassword = target.newPassword.value.trim()
    const newPasswordConfirm = target.newPasswordConfirm.value.trim()

    try {
      await updateUserPassword({
        password,
        newPassword,
        newPasswordConfirm,
      })
      onUpdated()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <>
      <Tittle className="text-xl" name="Update password"></Tittle>

      <Form onSubmit={handleUpdate}>
        <Input type="password" name="password" placeholder="Your password" />

        <Input type="password" name="newPassword" placeholder="New password" />

        <Input
          type="password"
          name="newPasswordConfirm"
          placeholder="Repeat new password"
        />

        <GeneralButton tittle="Update" />
      </Form>
    </>
  )
}
