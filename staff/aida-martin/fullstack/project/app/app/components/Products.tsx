'use client'

import Product from './Product'
import retrievePops from '../logic/retrievePops'
import retrievePopCollection from '../logic/retrievePopCollection'
import { PopCollection } from '../logic/retrievePopCollection'
import retrievePopWhislist from '../logic/retrievePopWhislist'
import { useEffect, useState } from 'react'

import { Pop } from '../logic/retrievePops'
import Search from './Search'
import Image from 'next/image'

export default function Products({
  className,
  search,
  searchClassName,
  slug,
}: {
  className?: string
  search?: boolean
  searchClassName?: string
  slug?: string
}) {
  const [pops, setPops] = useState<Pop[] | PopCollection[]>([])
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)

  const getPops = async () => {
    try {
      let pops

      if (searchValue === undefined) {
        pops =
          slug === 'collection'
            ? await retrievePopCollection()
            : slug === 'whislist'
            ? await retrievePopWhislist()
            : await retrievePops({ slug })
      } else {
        pops = await retrievePops({ slug, search: searchValue })
      }

      setPops(pops)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPops()
  }, [searchValue])

  return (
    <>
      {search && (
        <Search
          className={searchClassName}
          onSubmit={(search) => setSearchValue(search)}
        ></Search>
      )}

      {pops.length > 0 && (
        <div
          className={`w-full max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,_minmax(136px,1fr))] gap-4 ${className}`}
        >
          {pops.map((pop) => (
            <Product pop={pop} key={pop.id} onChange={getPops} />
          ))}
        </div>
      )}

      {pops.length < 1 && (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/no-pop.svg"
            alt="Empty"
            width={150}
            height={150}
            quality="100"
          />

          {(slug === 'whislist' || slug === 'collection') && (
            <p className="text-text-light text-lg">Your list is empty 😭</p>
          )}
          {slug !== 'whislist' && slug !== 'collection' && (
            <p className="text-text-light text-lg">No results 😭</p>
          )}
        </div>
      )}
    </>
  )
}
