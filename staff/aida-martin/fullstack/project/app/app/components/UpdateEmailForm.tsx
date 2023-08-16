import { FormEvent } from 'react'
import Form from '../library/Form'
import Input from '../library/Input'
import Tittle from '../library/Tittle'
import GeneralButton from './GeneralButton'
import updateUserEmail from '../logic/updateUserEmail'
import { User } from '../logic/retrieveUser'

export default function UpdateEmailForm({
  onUpdated,
  user,
}: {
  user: User
  onUpdated: () => void
}) {
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
      console.log(error)
    }
  }

  return (
    <>
      <Tittle className="text-xl" name="Update email"></Tittle>

      <Form onSubmit={handleUpdate}>
        <Input type="text" name="email" placeholder={user.email} />

        <GeneralButton tittle="Update" />
      </Form>
    </>
  )
}
