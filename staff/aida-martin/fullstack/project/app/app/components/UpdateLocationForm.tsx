import { FormEvent } from 'react'
import Form from '../library/Form'
import Input from '../library/Input'
import Tittle from '../library/Tittle'
import GeneralButton from './GeneralButton'
import updateUserLocation from '../logic/updateUserLocation'
import { User } from '../logic/retrieveUser'

export default function UpdateLocationForm({
  onUpdated,
  user,
}: {
  user: User
  onUpdated: () => void
}) {
  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      location: { value: string }
    }

    const location = target.location.value

    try {
      await updateUserLocation({
        location,
      })

      console.log(user.location)
      onUpdated()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <>
      <Tittle className="text-xl" name="Update location"></Tittle>

      <Form onSubmit={handleUpdate}>
        <Input
          type="text"
          name="location"
          placeholder={user.location ? user.location : 'Your location'}
        />

        <GeneralButton tittle="Update" />
      </Form>
    </>
  )
}
