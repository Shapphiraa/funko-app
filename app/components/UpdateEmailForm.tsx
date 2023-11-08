import { FormEvent } from 'react'
import Form from '../library/Form'
import Input from '../library/Input'
import Title from '../library/Title'
import GeneralButton from './GeneralButton'
import updateUserEmail from '../logic/updateUserEmail'
import { User } from '../logic/retrieveUser'
import useAppContext from '@/app/hooks/useAppContext'

export default function UpdateEmailForm({
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
      email: { value: string }
    }

    const email = target.email.value

    try {
      await updateUserEmail({
        email,
      })
      onUpdated()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <>
      <Title className="text-xl" name="Update email"></Title>

      <Form onSubmit={handleUpdate}>
        <Input type="text" name="email" defaultValue={user.email} />

        <GeneralButton title="Update" />
      </Form>
    </>
  )
}
