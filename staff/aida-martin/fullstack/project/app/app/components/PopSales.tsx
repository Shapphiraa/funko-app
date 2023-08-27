'use client'

import retrievePopsForSale from '../logic/retrieveSalePops'
import { useEffect, useState } from 'react'
import SalePop from './SalePop'

import { PopForSale } from '../logic/retrieveSalePops'

export default function PopSales({ className }: { className?: string }) {
  const [popsForSale, setPopsForSale] = useState<PopForSale[]>([])
  // TODO: spinner (freeze, unfreeze)
  const [loading, setLoading] = useState<Boolean>(true)

  const getPopsForSale = async () => {
    setLoading(true)
    const popsForSale = await retrievePopsForSale()

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
