import { FormEvent } from 'react'
import Form from '../library/Form'
import Input from '../library/Input'
import Title from '../library/Title'
import GeneralButton from './GeneralButton'
import updateUserName from '../logic/updateUserName'
import { User } from '../logic/retrieveUser'
import useAppContext from '../hooks/useAppContext'

export default function UpdateNameForm({
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
      name: { value: string }
    }

    const name = target.name.value

    try {
      await updateUserName({
        name,
      })
      onUpdated()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <>
      <Title className="text-xl" name="Update name"></Title>

      <Form onSubmit={handleUpdate}>
        <Input type="text" name="name" defaultValue={user.name} />

        <GeneralButton title="Update" />
      </Form>
    </>
  )
}
