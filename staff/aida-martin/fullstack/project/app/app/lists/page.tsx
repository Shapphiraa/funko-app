'use client'

import Tittle from '../library/Tittle'
import ListPreview from '../components/ListPreview'
import ContainerLink from '../components/ContainerLink'
import { lists } from '../infraestructure/lists'
import { IconBookmarkFill, IconHeartFill } from '../components/Icons'
import { redirect } from 'next/navigation'
import isUserLoggedIn from '../logic/isUserLoggedIn'

//mapear?

export default function Lists() {
  // Es necesario ponerlo de cliente para comprobar si el usuario está logueado
  if (!isUserLoggedIn()) redirect('/account/login')

  return (
    <section className="p-4 bg-white">
      <Tittle name="Your lists" />
      <div className="flex flex-col gap-3">
        <ContainerLink route={lists[0].route}>
          <ListPreview
            tittle="My collection"
            icon={<IconBookmarkFill size="60px" />}
            section="collection"
            subtittle="Last added"
            color="text-[#007cec]"
          />
        </ContainerLink>

        <ContainerLink route={lists[1].route}>
          <ListPreview
            tittle="My whislist"
            icon={<IconHeartFill size="60px" />}
            section="whislist"
            subtittle="Last added"
            color="text-[#EC0063]"
          />
        </ContainerLink>
      </div>
    </section>
  )
}
