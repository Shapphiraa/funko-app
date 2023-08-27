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
  const [pops, setPops] = useState<Pop[] | PopCollection[]>([])
  // TODO: spinner (freeze, unfreeze)
  const [loading, setLoading] = useState<Boolean>(true)

  const getPops = async () => {
    setLoading(true)
    const pops =
      slug === 'collection'
        ? await retrievePopCollection()
        : slug === 'whislist'
        ? await retrievePopWhislist()
        : await retrievePops({ slug })

    setPops(pops)
    setLoading(false)
  }

  useEffect(() => {
    getPops()
  }, [])

  // Arreglar con spinner
  if (loading) return null

  return (
    <div
      className={`w-full max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,_minmax(136px,1fr))] gap-4 ${className}`}
    >
      {pops.length > 0 ? (
        pops.map((pop) => <Product pop={pop} key={pop.id} onChange={getPops} />)
      ) : slug === 'collection' || slug === 'whislist' ? (
        <h2 className="text-text-light text-xl font-normal text-justify">
          This list is empty. Tap catalog to add products to this list.
        </h2>
      ) : null}
    </div>
  )
}
