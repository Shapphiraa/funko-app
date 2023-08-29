'use client'

import { FormEvent, useRef, useState } from 'react'
import { IKContext, IKUpload } from 'imagekitio-react'

import Form from '../library/Form'
import Input from '../library/Input'
import Tittle from '../library/Tittle'
import GeneralButton from './GeneralButton'
import createSalePop from '../logic/createSalePop'
import Select from './Select'
import Image from 'next/image'
import { Pop } from '../logic/retrievePops'
import { PopForSale } from '../logic/retrieveSalePop'
import { IconCamera } from './Icons'
import {
  urlEndpoint,
  publicKey,
  authenticationEndpoint,
  conditions,
  status,
} from '../infrastructure'
import updatePop from '../logic/updatePop'
import updateSalePop from '../logic/updateSalePop'

export default function SalePopForm({
  pops,
  onSubmit,
  salePop,
  tittle,
  submitLabel,
}: {
  pops: Pop[]
  onSubmit: () => void
  salePop?: PopForSale
  tittle: string
  submitLabel: string
}) {
  const [firstImage, setFirstImage] = useState<string | null>(
    salePop?.images[0] ?? null
  )
  const [secondImage, setSecondImage] = useState<string | null>(
    salePop?.images[1] ?? null
  )

  const firstImageRef = useRef<HTMLInputElement>(null)
  const secondImageRef = useRef<HTMLInputElement>(null)

  const popsOptions = pops.map((pop) => ({
    key: `pop-${pop.id}`,
    value: pop.id,
    label: pop.name,
  }))

  const onError = (err: any) => {
    console.log('Error', err)
  }

  const onSuccessImage = (res: any) => {
    setFirstImage(res.url)
  }

  const onSuccessBoxImage = (res: any) => {
    setSecondImage(res.url)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    // Errores typescript... mostrar alert de error
    if (firstImage === null || secondImage === null) {
      return
    }

    const target = event.target as typeof event.target & {
      description: { value: string }
      condition: { value: string }
      pop: { value: string }
      price: { value: number }
    }

    const description = target.description.value
    const condition = target.condition.value
    const price = target.price.value
    const images = [firstImage, secondImage]
    const pop = target.pop.value

    try {
      salePop
        ? await updateSalePop({
            id: salePop.id,
            description,
            condition,
            price,
            images,
          })
        : await createSalePop({
            description,
            condition,
            pop,
            images,
            price,
          })
      onSubmit()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <>
      <Tittle className="text-2xl" name={tittle}></Tittle>

      <Form onSubmit={handleSubmit}>
        <div className="flex m-auto gap-3 mt-3">
          {firstImage === null ? (
            <>
              <button
                type="button"
                className="w-[150px] h-[150px] border-general-blue border-2 rounded-2xl text-general-blue"
                onClick={() => {
                  firstImageRef.current!.click()
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
                  inputRef={firstImageRef}
                  onError={onError}
                  onSuccess={onSuccessImage}
                  hidden
                />
              </IKContext>
            </>
          ) : (
            <>
              <Image
                src={firstImage}
                alt="New image"
                width={150}
                height={150}
                className="rounded-2xl object-cover w-[150px] h-[150px]"
                onClick={() => {
                  firstImageRef.current!.click()
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
                  inputRef={firstImageRef}
                  onError={onError}
                  onSuccess={onSuccessImage}
                  hidden
                />
              </IKContext>
            </>
          )}

          {secondImage === null ? (
            <>
              <button
                type="button"
                className="w-[150px] h-[150px] border-general-blue border-2 rounded-2xl text-general-blue"
                onClick={() => {
                  secondImageRef.current!.click()
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
                  inputRef={secondImageRef}
                  onError={onError}
                  onSuccess={onSuccessBoxImage}
                  hidden
                />
              </IKContext>
            </>
          ) : (
            <>
              <Image
                src={secondImage}
                alt="New Box Image"
                width={150}
                height={150}
                className="rounded-2xl object-cover w-[150px] h-[150px]"
                onClick={() => {
                  secondImageRef.current!.click()
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
                  inputRef={secondImageRef}
                  onError={onError}
                  onSuccess={onSuccessBoxImage}
                  hidden
                />
              </IKContext>
            </>
          )}
        </div>

        <label className="text-text-light text-lg font-medium">
          Description:
        </label>

        <textarea
          className="focus:outline-general-blue p-2 text-text-light h-[100px] bg-[#F6F6F6] rounded-xl text-lg"
          name="description"
          defaultValue={salePop?.description ?? ''}
          spellCheck={false}
        />

        <label className="text-text-light text-lg font-medium">
          Condition:
        </label>
        <Select
          id="condition-select"
          name="condition"
          options={conditions}
          defaultValue={salePop?.condition ?? ''}
        />

        <label className="text-text-light text-lg font-medium">Pop:</label>
        <Select
          id="pop-select"
          name="pop"
          options={popsOptions}
          defaultValue={salePop?.pop.id ?? ''}
          disabled={salePop ? true : false}
        />

        <>
          {!salePop && (
            <>
              <label className="text-text-light text-lg font-medium">
                Status:
              </label>
              <Select
                id="status-select"
                name="status"
                options={status}
                disabled
              />
            </>
          )}
        </>

        <label className="text-text-light text-lg font-medium">Price:</label>
        {/* @ts-ignore */}
        <Input type="text" name="price" defaultValue={salePop?.price ?? ''} />

        <GeneralButton tittle={submitLabel} />
      </Form>
    </>
  )
}
