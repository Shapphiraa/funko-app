'use client'

import { useEffect, useState } from 'react'
import SalePop from './SalePop'
import retrieveSalePops, { PopForSale } from '../logic/retrieveSalePops'
import { User } from '../logic/retrieveUser'
import retrieveUserSalePops from '../logic/retrieveUserSalePops'

export default function PopSales({
  className,
  user,
}: {
  className?: string
  user?: User
}) {
  const [popsForSale, setPopsForSale] = useState<PopForSale[]>([])
  // TODO: spinner (freeze, unfreeze)
  const [loading, setLoading] = useState<Boolean>(true)

  const getPopsForSale = async () => {
    setLoading(true)

    let popsForSale

    if (user) {
      popsForSale = await retrieveUserSalePops()
    } else {
      popsForSale = await retrieveSalePops()
    }

    setPopsForSale(popsForSale)
    setLoading(false)
  }

  useEffect(() => {
    getPopsForSale()
  }, [])

  // Arreglar con spinner
  if (loading) return null

  return (
    <div
      className={`w-full max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,_minmax(136px,1fr))] gap-4 ${className}`}
    >
      {popsForSale &&
        popsForSale.map((salePop) => (
          <SalePop salePop={salePop} key={salePop.id} />
        ))}
    </div>
  )
}