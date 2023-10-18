'use client'

import isUserLoggedIn from '@/app/logic/isUserLoggedIn'
import MenuHeader from '../../components/MenuHeader'
import Products from '../../components/Products'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export async function generateStaticParams() {
  return [
    {
      slug: 'collection',
    },
    {
      slug: 'whislist',
    },
  ]
}

export default function ListsPages({ params }: { params: { slug: string } }) {
  const [isUserLogged, setIsUserLogged] = useState<boolean | null>(null)

  const tittle = params.slug === 'collection' ? 'My Collection' : 'My Whislist'

  useEffect(() => {
    if (!isUserLoggedIn()) {
      redirect('/account/login')
    }

    setIsUserLogged(true)
  }, [])

  return (
    <>
      {isUserLogged && (
        <section className="pt-4 bg-white">
          <MenuHeader name={tittle} route="/lists" />

          <Products slug={params.slug} className="p-4" />
        </section>
      )}
    </>
  )
}
