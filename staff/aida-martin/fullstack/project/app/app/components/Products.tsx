'use client'

import Product from './Product'
import retrievePops from '../logic/retrievePops'
import { useEffect, useState } from 'react'

import { PopType } from '../logic/retrievePops'

export default function Products({ className }: { className?: string }) {
  const [pops, setPops] = useState<PopType[]>([])

  const getProps = async () => {
    const pops = await retrievePops()
    setPops(pops)
  }

  useEffect(() => {
    getProps()
  }, [])

  return (
    <div
      className={`w-full max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,_minmax(136px,1fr))] gap-4 ${className}`}
    >
      {pops &&
        pops.map((pop) => (
          <Product
            key={pop.id}
            image={pop.images[0]}
            type={pop.variant}
            name={pop.name}
          />
        ))}
    </div>
  )
}
