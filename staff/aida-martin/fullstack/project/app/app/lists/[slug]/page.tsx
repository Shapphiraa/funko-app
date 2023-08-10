'use client'

import isUserLoggedIn from '@/app/logic/isUserLoggedIn'
import MenuHeader from '../../components/MenuHeader'
import Products from '../../components/Products'
import { redirect } from 'next/navigation'

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
  if (!isUserLoggedIn()) redirect('/account/login')

  const tittle = params.slug === 'collection' ? 'My Collection' : 'My Whislist'

  return (
    <section className="pt-4 bg-white">
      <MenuHeader name={tittle} route="/lists" />

      <Products slug={params.slug} className="p-4" />
    </section>
  )
}
