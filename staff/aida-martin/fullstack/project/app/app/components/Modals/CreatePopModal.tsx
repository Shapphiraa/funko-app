import AccountContainer from '../AccountContainer'
import { IconArrowLeft } from '../Icons'
import PopForm from '../PopForm'
import retrieveCategories, { Category } from '@/app/logic/retrieveCategories'
import useAppContext from '@/app/hooks/useAppContext'

interface CreatePopModalProps {
  onSubmit: () => void
  onCancel: () => void
}

export default async function CreatePopModal({
  onSubmit,
  onCancel,
}: CreatePopModalProps) {
  const { alert } = useAppContext()

  let categories: Category[] = []

  try {
    categories = await retrieveCategories()
  } catch (error: any) {
    alert(error.message)
  }

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
