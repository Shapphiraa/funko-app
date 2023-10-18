'use client'

import AccountContainer from '../AccountContainer'
import { IconArrowLeft } from '../Icons'
import { Pop } from '../../logic/retrievePop'
import PopForm from '../PopForm'
import retrieveCategories, { Category } from '@/app/logic/retrieveCategories'
import useAppContext from '@/app/hooks/useAppContext'
import { useEffect, useState } from 'react'

interface PopModalProps {
  pop?: Pop
  onSubmit: () => void
  onCancel: () => void
  onCreate?: boolean
}

export default function PopModal({
  onSubmit,
  onCancel,
  onCreate,
  pop,
}: PopModalProps) {
  const { alert } = useAppContext()

  const [categories, setCategories] = useState<Category[] | null>(null)

  const getCategories = async () => {
    try {
      const categories = await retrieveCategories()

      setCategories(categories)
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      {categories && (
        <AccountContainer className="h-auto">
          <button
            className="text-general-blue flex items-center justify-center h-9 w-9 mb-5"
            onClick={onCancel}
          >
            <IconArrowLeft size="24px"></IconArrowLeft>
          </button>

          <PopForm
            categories={categories}
            pop={pop}
            onSubmit={onSubmit}
            tittle={onCreate ? 'Create pop' : 'Update pop'}
            submitLabel={onCreate ? 'Create' : 'Update'}
          />
        </AccountContainer>
      )}
    </>
  )
}
