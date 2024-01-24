'use client'

import { useEffect, useState } from 'react'
import SalePop from './SalePop'
import retrieveSalePops, { PopForSale } from '../logic/retrieveSalePops'
import { User } from '../logic/retrieveUser'
import retrieveUserSalePops from '../logic/retrieveUserSalePops'
import useAppContext from '@/app/hooks/useAppContext'
import Image from 'next/image'
import Loader from './Loader'

export default function PopSales({
  className,
  user,
}: {
  className?: string
  user?: User
}) {
  const { alert } = useAppContext()

  const [popsForSale, setPopsForSale] = useState<PopForSale[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getPopsForSale = async () => {
    setIsLoading(true)

    let popsForSale

    try {
      setTimeout(async () => {
        if (user) {
          popsForSale = await retrieveUserSalePops()
        } else {
          popsForSale = await retrieveSalePops()
        }

        setPopsForSale(popsForSale)
        setIsLoading(false)
      }, 500)
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getPopsForSale()
  }, [])

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={`w-full max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,_minmax(136px,1fr))] gap-4 ${className}`}
      >
        {popsForSale &&
          popsForSale.length > 0 &&
          popsForSale.map((salePop) => (
            <SalePop salePop={salePop} key={salePop.id} />
          ))}

        {popsForSale && popsForSale.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/no-pop.svg"
              alt="Empty"
              width={150}
              height={150}
              quality="100"
            />
            <p className="text-text-light text-lg">No results 😭</p>
          </div>
        )}
      </div>
    </>
  )
}
