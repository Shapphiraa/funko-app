'use client'

import Container from '../library/Container'
import Image from 'next/image'
import retrievePopCollectionPreview from '../logic/retrievePopCollectionPreview'
import { PopCollectionPreview } from '../logic/retrievePopCollectionPreview'
import retrievePopWhislistPreview from '../logic/retrievePopWhislistPreview'
import { useEffect, useState } from 'react'

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
  const [preview, setPreview] = useState<PopCollectionPreview>()

  const getPreview = async () => {
    if (section) {
      const preview =
        section === 'collection'
          ? await retrievePopCollectionPreview()
          : await retrievePopWhislistPreview()

      setPreview(preview)
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
            {preview?.quantity}
          </h3>
        </div>
        <div className="flex flex-col items-center p-2">
          <h3 className="text-text-light text-lg font-normal">{subtittle}</h3>
          <div>
            {preview && (
              <Image
                src={preview.lastAddedPopImage}
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
