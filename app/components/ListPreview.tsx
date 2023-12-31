'use client'

import Container from '../library/Container'
import Image from 'next/image'
import retrievePopCollectionPreview from '../logic/retrievePopCollectionPreview'
import { PopCollectionPreview } from '../logic/retrievePopCollectionPreview'
import retrievePopWhislistPreview from '../logic/retrievePopWhislistPreview'
import { useEffect, useState } from 'react'
import useAppContext from '@/app/hooks/useAppContext'
import Loader from './Loader'
import { Spinner } from '@nextui-org/react'

interface ListPreviewProps {
  icon: JSX.Element
  title: string
  section?: string
  subtitle: string
  color: string
}

export default function ListPreview({
  icon,
  title,
  section,
  subtitle,
  color,
}: ListPreviewProps) {
  const { alert } = useAppContext()

  const [preview, setPreview] = useState<PopCollectionPreview>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getPreview = async () => {
    try {
      if (section) {
        setIsLoading(true)

        setTimeout(async () => {
          const preview =
            section === 'collection'
              ? await retrievePopCollectionPreview()
              : await retrievePopWhislistPreview()

          setPreview(preview)
          setIsLoading(false)
        }, 500)
      }
    } catch (error: any) {
      setIsLoading(false)
      alert(error.message)
    }
  }

  useEffect(() => {
    getPreview()
  }, [])

  return (
    <Container className={`p-5 ${color} lg:h-[300px]`}>
      <h2 className="text-text-light text-xl font-semibold lg:text-2xl">{title}</h2>
      <div className="grid grid-cols-2 place-items-center">
        <div className="flex flex-col items-center p-10">
          {icon}
          <h3 className="text-text-light text-4xl lg:text-5xl font-bold">
            {preview ? preview.quantity : 0}
          </h3>
        </div>
        <div className="flex flex-col items-center p-2">
          <h3 className="text-text-light text-lg lg:text-2xl font-normal">
            {preview ? subtitle : 'No added pop'}
          </h3>
          <div>
            {isLoading && (
              <div className="w-[130px] h-[130px] flex flex-col">
                <Spinner className="m-auto" />
              </div>
            )}

            {preview && !isLoading && (
              <Image
                src={preview.lastAddedPopImage}
                alt="Preview"
                width="200"
                height="200"
                quality="100"
                className="lg:w-[200px] lg:h-[200px]"
              />
            )}

            {!preview && !isLoading && (
              <Image
                src="/no-pop.svg"
                alt="Preview"
                width="200"
                height="200"
                quality="100"
                className="lg:w-[200px] lg:h-[200px]"
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
