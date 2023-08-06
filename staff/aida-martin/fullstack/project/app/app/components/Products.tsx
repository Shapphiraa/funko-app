'use client'

import Product from './Product'
import retrievePops from '../logic/retrievePops'
import { useEffect, useState } from 'react'

import { Pop } from '../logic/retrievePops'

export default function Products({
  className,
  slug,
}: {
  className?: string
  slug?: string
}) {
  const [pops, setPops] = useState<Pop[]>([])

  const getPops = async () => {
    let pops = await retrievePops({ slug })

    setPops(pops)
  }

  useEffect(() => {
    getPops()
  }, [])

  return (
    <div
      className={`w-full max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,_minmax(136px,1fr))] gap-4 ${className}`}
    >
      {pops &&
        pops.map((pop) => (
          <Product
            key={pop.id}
            id={pop.id}
            image={pop.images[0]}
            type={pop.variant}
            name={pop.name}
          />
        ))}
    </div>
  )
}
