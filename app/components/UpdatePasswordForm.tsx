import { FormEvent } from 'react'
import Form from '../library/Form'
import Input from '../library/Input'
import Title from '../library/Title'
import GeneralButton from './GeneralButton'
import updateUserPassword from '../logic/updateUserPassword'
import useAppContext from '../hooks/useAppContext'

export default function UpdatePasswordForm({
  onUpdated,
}: {
  onUpdated: () => void
}) {
  const { alert } = useAppContext()

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
      alert(error.message)
    }
  }

  return (
    <>
      <Title className="text-xl" name="Update password"></Title>

      <Form onSubmit={handleUpdate}>
        <Input type="password" name="password" placeholder="Your password" />

        <Input type="password" name="newPassword" placeholder="New password" />

        <Input
          type="password"
          name="newPasswordConfirm"
          placeholder="Repeat new password"
        />

        <GeneralButton title="Update" />
      </Form>
    </>
  )
}
