'use client'

import Product from './Product'
import retrievePops from '../logic/retrievePops'
import retrievePopCollection from '../logic/retrievePopCollection'
import { PopCollection } from '../logic/retrievePopCollection'
import retrievePopWhislist from '../logic/retrievePopWhislist'
import { useEffect, useState } from 'react'

import { Pop } from '../logic/retrievePops'

export default function Products({
  className,
  slug,
}: {
  className?: string
  slug?: string
}) {
  const [pops, setPops] = useState<Pop[] | PopCollection[] | null>([])

  const getPops = async () => {
    const pops =
      slug === 'collection'
        ? await retrievePopCollection()
        : slug === 'whislist'
        ? await retrievePopWhislist()
        : await retrievePops({ slug })
    //helper isValidRoute para retrievePops?

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
            pop={pop}
            key={pop.id}
            id={pop.id}
            image={pop.images[0]}
            type={pop.variant}
            name={pop.name}
            onChange={getPops}
          />
        ))}
    </div>
  )
}
