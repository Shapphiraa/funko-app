import AccountContainer from '../AccountContainer'
import { IconArrowLeft } from '../Icons'
import PopForm from '../PopForm'
import retrieveCategories from '@/app/logic/retrieveCategories'

interface CreatePopModalProps {
  onSubmit: () => void
  onCancel: () => void
}

export default async function CreatePopModal({
  onSubmit,
  onCancel,
}: CreatePopModalProps) {
  const categories = await retrieveCategories()

  return (
    <>
      <AccountContainer className="h-auto">
        <button
          className="text-general-blue flex items-center justify-center h-9 w-9 mb-5"
          onClick={onCancel}
        >
          <IconArrowLeft size="24px"></IconArrowLeft>
        </button>

        <PopForm
          categories={categories}
          onSubmit={onSubmit}
          tittle="Create pop"
          submitLabel="Create"
        />
      </AccountContainer>
    </>
  )
}
