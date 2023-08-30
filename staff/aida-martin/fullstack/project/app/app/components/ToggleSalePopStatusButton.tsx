import { useState } from 'react'
import toggleSalePopStatus from '../logic/toggleSalePopStatus '
import GeneralButton from './GeneralButton'

export default function ToggleSalePopStatusButton({
  salePop,
  onChange,
}: {
  salePop: {
    id: string
    status: string
  }
  onChange: () => void
}) {
  const [isReserved, setIsReserved] = useState<boolean>(
    salePop.status === 'Reserved' ? true : false
  )

  const handleToggleStatus = async () => {
    await toggleSalePopStatus({ id: salePop.id })

    setIsReserved(!isReserved)

    onChange()

    return
  }

  return (
    <>
      {salePop.status === 'Available' && (
        <GeneralButton
          className="justify-self-center w-full"
          tittle="Reserved"
          onClick={handleToggleStatus}
        ></GeneralButton>
      )}

      {salePop.status === 'Reserved' && (
        <GeneralButton
          className="justify-self-center w-full"
          tittle="Available"
          color="bg-blue-400"
          onClick={handleToggleStatus}
        ></GeneralButton>
      )}
    </>
  )
}
