import AccountContainer from '../AccountContainer'
import { IconArrowLeft } from '../Icons'
import SalePopForm from '../SalePopForm'
import retrievePops from '@/app/logic/retrievePops'

interface CreateSalePopModalProps {
  onSubmit: () => void
  onCancel: () => void
}

export default async function CreateSalePopModal({
  onSubmit,
  onCancel,
}: CreateSalePopModalProps) {
  const pops = await retrievePops({})

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
