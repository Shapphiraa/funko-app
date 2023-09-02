import AccountContainer from '../AccountContainer'
import { IconArrowLeft } from '../Icons'
import {
  FIELD_LOCATION,
  FIELD_EMAIL,
  FIELD_NAME,
  FIELD_PASSWORD,
  FIELD_PHONE,
  FieldType,
} from '../../../types.d'
import UpdatePasswordForm from '../UpdatePasswordForm'
import UpdateNameForm from '../UpdateNameForm'
import UpdateEmailForm from '../UpdateEmailForm'
import UpdatePhoneNumberForm from '../UpdatePhoneNumberForm'
import UpdateLocationForm from '../UpdateLocationForm'
import { User } from '../../logic/retrieveUser'

interface UpdatePersonalInfoModalProps {
  field: FieldType
  user: User
  onUpdated: () => void
  onCancel: () => void
}

type ComponentFieldType = Record<
  FieldType,
  ({ user, onUpdated }: { user: User; onUpdated: () => void }) => JSX.Element
>

const componentsField: ComponentFieldType = {
  [FIELD_PASSWORD]: UpdatePasswordForm,
  [FIELD_NAME]: UpdateNameForm,
  [FIELD_EMAIL]: UpdateEmailForm,
  [FIELD_PHONE]: UpdatePhoneNumberForm,
  [FIELD_LOCATION]: UpdateLocationForm,
}

export default function UpdatePersonalInfoModal({
  field,
  onUpdated,
  onCancel,
  user,
}: UpdatePersonalInfoModalProps) {
  const DinamicComponent = componentsField[field]

  return (
    <>
      <div className="h-screen w-screen absolute bg-black bg-opacity-25 top-0">
        <AccountContainer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[18rem] pt-5 px-5 flex flex-col m-auto rounded-xl shadow-xl">
          <button
            className="text-general-blue flex items-center justify-center h-5 w-5 mb-3"
            onClick={onCancel}
          >
            <IconArrowLeft size="24px"></IconArrowLeft>
          </button>

          <DinamicComponent user={user} onUpdated={onUpdated} />
        </AccountContainer>
      </div>
    </>
  )
}
