'use client'

import { FormEvent, useRef, useState } from 'react'
import { IKContext, IKUpload } from 'imagekitio-react'

import Form from '../library/Form'
import Input from '../library/Input'
import Tittle from '../library/Tittle'
import GeneralButton from './GeneralButton'
import createPop from '../logic/createPop'
import Select from './Select'
import Image from 'next/image'
import { Category } from '../logic/retrieveCategories'
import { Pop } from '../logic/retrievePop'
import { IconCamera } from './Icons'
import {
  urlEndpoint,
  publicKey,
  authenticationEndpoint,
  exclusivities,
  variants,
  availabilities,
} from '../infrastructure'
import updatePop from '../logic/updatePop'
import useAppContext from '@/app/hooks/useAppContext'

export default function PopForm({
  categories,
  onSubmit,
  pop,
  tittle,
  submitLabel,
}: {
  categories: Category[]
  onSubmit: () => void
  pop?: Pop
  tittle: string
  submitLabel: string
}) {
  const { alert } = useAppContext()

  const [image, setImage] = useState<string | ''>(pop?.images[0] ?? '')
  const [boxImage, setBoxImage] = useState<string | ''>(pop?.images[1] ?? '')

  const imageRef = useRef<HTMLInputElement>(null)
  const boxImageRef = useRef<HTMLInputElement>(null)

  const categoriesOptions = categories.map((category) => ({
    key: `category-${category.slug}`,
    value: category.id,
    label: category.name,
  }))

  const onError = (err: any) => {
    console.log('Error', err)
  }

  const onSuccessImage = (res: any) => {
    setImage(res.url)
  }

  const onSuccessBoxImage = (res: any) => {
    setBoxImage(res.url)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      variant: { value: string }
      exclusivity: { value: string }
      name: { value: string }
      number: { value: string }
      category: { value: string }
      collect: { value: string }
      release: { value: string }
      availability: { value: string }
    }

    const variant = target.variant.value
    const exclusivity = target.exclusivity.value
    const name = target.name.value
    const number = target.number.value
    const images = [image, boxImage]
    const category = target.category.value
    const collect = target.collect.value
    const release = target.release.value
    const availability = target.availability.value

    try {
      pop
        ? await updatePop({
            id: pop.id,
            variant,
            exclusivity,
            name,
            number,
            images,
            category,
            collect,
            release,
            availability,
          })
        : await createPop({
            variant,
            exclusivity,
            name,
            number,
            images,
            category,
            collect,
            release,
            availability,
          })
      onSubmit()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <>
      <Tittle className="text-2xl" name={tittle}></Tittle>

      <Form onSubmit={handleSubmit}>
        <div className="flex m-auto gap-3 mt-3">
          {image === '' ? (
            <>
              <button
                type="button"
                className="w-[150px] h-[150px] border-general-blue border-2 rounded-2xl text-general-blue"
                onClick={() => {
                  imageRef.current!.click()
                }}
              >
                <IconCamera size="50px" className="m-auto" />
              </button>
              {/* @ts-ignore */}
              <IKContext
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticationEndpoint={authenticationEndpoint}
              >
                {/* @ts-ignore */}
                <IKUpload
                  inputRef={imageRef}
                  onError={onError}
                  onSuccess={onSuccessImage}
                  hidden
                />
              </IKContext>
            </>
          ) : (
            <>
              <Image
                src={image}
                alt="New image"
                width={150}
                height={150}
                className="rounded-2xl  w-[150px] h-[150px]"
                onClick={() => {
                  imageRef.current!.click()
                }}
              />

              {/* @ts-ignore */}
              <IKContext
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticationEndpoint={authenticationEndpoint}
              >
                {/* @ts-ignore */}
                <IKUpload
                  inputRef={imageRef}
                  onError={onError}
                  onSuccess={onSuccessImage}
                  hidden
                />
              </IKContext>
            </>
          )}

          {boxImage === '' ? (
            <>
              <button
                type="button"
                className="w-[150px] h-[150px] border-general-blue border-2 rounded-2xl text-general-blue"
                onClick={() => {
                  boxImageRef.current!.click()
                }}
              >
                <IconCamera size="50px" className="m-auto" />
              </button>
              {/* @ts-ignore */}
              <IKContext
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticationEndpoint={authenticationEndpoint}
              >
                {/* @ts-ignore */}
                <IKUpload
                  inputRef={boxImageRef}
                  onError={onError}
                  onSuccess={onSuccessBoxImage}
                  hidden
                />
              </IKContext>
            </>
          ) : (
            <>
              <Image
                src={boxImage}
                alt="New Box Image"
                width={150}
                height={150}
                className="rounded-2xl w-[150px] h-[150px]"
                onClick={() => {
                  boxImageRef.current!.click()
                }}
              />

              {/* @ts-ignore */}
              <IKContext
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticationEndpoint={authenticationEndpoint}
              >
                {/* @ts-ignore */}
                <IKUpload
                  inputRef={boxImageRef}
                  onError={onError}
                  onSuccess={onSuccessBoxImage}
                  hidden
                />
              </IKContext>
            </>
          )}
        </div>

        <label className="text-text-light text-lg font-normal">Variant:</label>
        <Select
          id="variant-select"
          name="variant"
          options={variants}
          defaultValue={pop?.variant ?? ''}
        />

        <label className="text-text-light text-lg font-normal">
          Exclusivity:
        </label>
        <Select
          id="exclusivity-select"
          name="exclusivity"
          options={exclusivities}
          defaultValue={pop?.exclusivity ?? ''}
        />

        <label className="text-text-light text-lg font-normal">Name:</label>
        <Input type="text" name="name" defaultValue={pop?.name ?? ''} />
        <label className="text-text-light text-lg font-normal">Number:</label>

        {/* @ts-ignore */}
        <Input type="number" name="number" defaultValue={pop?.number ?? ''} />

        <label className="text-text-light text-lg font-normal">Category:</label>
        <Select
          id="category-select"
          name="category"
          options={categoriesOptions}
          defaultValue={pop?.category.id ?? ''}
        />

        <label className="text-text-light text-lg font-normal">
          Collection:
        </label>
        <Input type="text" name="collect" defaultValue={pop?.collect ?? ''} />
        <label className="text-text-light text-lg font-normal">Release:</label>
        <Input type="text" name="release" defaultValue={pop?.release ?? ''} />

        <label className="text-text-light text-lg font-normal">
          Availability:
        </label>
        <Select
          id="availability-select"
          name="availability"
          options={availabilities}
          defaultValue={pop?.availability ?? ''}
        />

        <GeneralButton tittle={submitLabel} />
      </Form>
    </>
  )
}
