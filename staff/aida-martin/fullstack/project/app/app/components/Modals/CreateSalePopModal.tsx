import AccountContainer from '../AccountContainer'
import { IconArrowLeft } from '../Icons'
import SalePopForm from '../SalePopForm'
import retrievePops, { Pop } from '@/app/logic/retrievePops'
import useAppContext from '@/app/hooks/useAppContext'

interface CreateSalePopModalProps {
  onSubmit: () => void
  onCancel: () => void
}

export default async function CreateSalePopModal({
  onSubmit,
  onCancel,
}: CreateSalePopModalProps) {
  const { alert } = useAppContext()

  let pops: Pop[] = []

  try {
    pops = await retrievePops({})
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

        <SalePopForm
          pops={pops}
          onSubmit={onSubmit}
          tittle="Create pop for sale"
          submitLabel="Create"
        />
      </AccountContainer>
    </>
  )
}
