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
import useAppContext from '@/app/hooks/useAppContext'
import Loader from './Loader'

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
  const { alert } = useAppContext()

  const [pops, setPops] = useState<Pop[] | PopCollection[] | null>(null)
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)

  const [isLoading, setIsLoading] = useState<boolean>(false)

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
      setIsLoading(false)
      alert(error.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)

    setTimeout(async () => {
      getPops()
      setIsLoading(false)
    }, 500)
  }, [searchValue])

  return (
    <>
      {search && (
        <Search
          className={searchClassName}
          onSubmit={(search) => setSearchValue(search)}
        ></Search>
      )}

      {isLoading && <Loader />}

      {!isLoading && pops && pops.length > 0 && (
        <div
          className={`w-full max-w-6xl mx-auto grid grid-cols-2 gap-4 ${className}`}
        >
          {pops.map((pop) => (
            <Product pop={pop} key={pop.id} onChange={getPops} />
          ))}
        </div>
      )}

      {!isLoading && pops && pops.length === 0 && (
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
