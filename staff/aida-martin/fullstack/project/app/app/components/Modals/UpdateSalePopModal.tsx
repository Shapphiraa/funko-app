import { PopForSale } from '@/app/logic/retrieveSalePop'
import AccountContainer from '../AccountContainer'
import { IconArrowLeft } from '../Icons'
import SalePopForm from '../SalePopForm'
import retrievePops from '@/app/logic/retrievePops'

interface UpdateSalePopModalProps {
  salePop: PopForSale
  onSubmit: () => void
  onCancel: () => void
}

export default async function UpdateSalePopModal({
  onSubmit,
  onCancel,
  salePop,
}: UpdateSalePopModalProps) {
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
          salePop={salePop}
          onSubmit={onSubmit}
          tittle="Update pop for sale"
          submitLabel="Update"
        />
      </AccountContainer>
    </>
  )
}
