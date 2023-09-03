'use client'

import { PopForSale } from '@/app/logic/retrieveSalePop'
import AccountContainer from '../AccountContainer'
import { IconArrowLeft } from '../Icons'
import SalePopForm from '../SalePopForm'
import retrievePops, { Pop } from '@/app/logic/retrievePops'
import useAppContext from '@/app/hooks/useAppContext'
import { useEffect, useState } from 'react'

interface SalePopModalProps {
  salePop?: PopForSale
  onSubmit: () => void
  onCancel: () => void
  onCreate?: boolean
}

export default function SalePopModal({
  onSubmit,
  onCancel,
  onCreate,
  salePop,
}: SalePopModalProps) {
  const { alert } = useAppContext()

  const [pops, setPops] = useState<Pop[] | null>(null)

  const getPops = async () => {
    try {
      const pops = await retrievePops({})

      setPops(pops)
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getPops()
  }, [])

  return (
    <>
      {pops && (
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
            tittle={onCreate ? 'Create pop for sale' : 'Update pop for sale'}
            submitLabel={onCreate ? 'Create' : 'Update'}
          />
        </AccountContainer>
      )}
    </>
  )
}
