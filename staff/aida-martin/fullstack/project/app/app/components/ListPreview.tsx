'use client'

import Container from '../library/Container'
import Image from 'next/image'
import retrievePopCollectionPreview from '../logic/retrievePopCollectionPreview'
import { PopCollectionPreview } from '../logic/retrievePopCollectionPreview'
import retrievePopWhislistPreview from '../logic/retrievePopWhislistPreview'
import { useEffect, useState } from 'react'
import useAppContext from '@/app/hooks/useAppContext'

interface ListPreviewProps {
  icon: JSX.Element
  tittle: string
  section?: string
  subtittle: string
  color: string
}

export default function ListPreview({
  icon,
  tittle,
  section,
  subtittle,
  color,
}: ListPreviewProps) {
  const { alert } = useAppContext()

  const [preview, setPreview] = useState<PopCollectionPreview>()

  const getPreview = async () => {
    try {
      if (section) {
        const preview =
          section === 'collection'
            ? await retrievePopCollectionPreview()
            : await retrievePopWhislistPreview()

        setPreview(preview)
      }
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getPreview()
  }, [])

  return (
    <Container className={`p-5 ${color}`}>
      <h2 className="text-text-light text-xl font-semibold">{tittle}</h2>
      <div className="grid grid-cols-2 place-items-center">
        <div className="flex flex-col items-center p-10">
          {icon}
          <h3 className="text-text-light text-4xl font-bold">
            {preview ? preview.quantity : 0}
          </h3>
        </div>
        <div className="flex flex-col items-center p-2">
          <h3 className="text-text-light text-lg font-normal">
            {preview ? subtittle : 'No added pop'}
          </h3>
          <div>
            {preview ? (
              <Image
                src={preview.lastAddedPopImage}
                alt="Preview"
                width="130"
                height="130"
                quality="100"
              />
            ) : (
              <Image
                src="/no-pop.svg"
                alt="Preview"
                width="130"
                height="130"
                quality="100"
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
