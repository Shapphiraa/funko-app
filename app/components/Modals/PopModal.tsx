'use client'

import Container from '../../library/Container'
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
        <>
          <button
            className="lg:hidden text-general-blue flex items-center justify-center h-9 w-9 mb-5 "
            onClick={onCancel}
          >
            <IconArrowLeft size="24px"></IconArrowLeft>
          </button>

        <Container className="h-auto lg:w-[1200px] lg:m-auto lg:mt-5 p-5">
          <PopForm
            categories={categories}
            pop={pop}
            onSubmit={onSubmit}
            title={onCreate ? 'Create pop' : 'Update pop'}
            submitLabel={onCreate ? 'Create' : 'Update'}
          />
        </Container>
        </>
      )}
    </>
  )
}
