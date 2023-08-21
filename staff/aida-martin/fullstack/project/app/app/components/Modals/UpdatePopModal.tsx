import AccountContainer from '../AccountContainer'
import { IconArrowLeft } from '../Icons'
import UpdatePopForm from '../UpdatePopForm'
import { Pop } from '../../logic/retrievePop'

interface UpdatePopModalProps {
  pop: Pop
  onEdited: () => void
  onCancel: () => void
}

export default function UpdatePopModal({
  onEdited,
  onCancel,
  pop,
}: UpdatePopModalProps) {
  return (
    <>
      <AccountContainer className="h-auto">
        <button
          className="text-general-blue flex items-center justify-center h-5 w-5 mb-7"
          onClick={onCancel}
        >
          <IconArrowLeft size="24px"></IconArrowLeft>
        </button>

        <UpdatePopForm pop={pop} onEdited={onEdited} />
      </AccountContainer>
    </>
  )
}
