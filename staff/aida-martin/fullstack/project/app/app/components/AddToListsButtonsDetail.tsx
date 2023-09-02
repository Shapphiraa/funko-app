'use client'

import {
  IconHeart,
  IconHeartFill,
  IconBookmark,
  IconBookmarkFill,
} from './Icons'
import toggleSaveInCollection from '../logic/toggleSaveInCollection'
import toggleSaveInWhislist from '../logic/toggleSaveInWhislist'
import { useState } from 'react'
import isUserLoggedIn from '../logic/isUserLoggedIn'
import { useRouter } from 'next/navigation'
import GeneralButton from './GeneralButton'
import useAppContext from '@/app/hooks/useAppContext'

export default function AddListsButtonsDetail({
  pop,
  onChange,
}: {
  pop: {
    id: string
    userCollect: boolean
    userWhislist: boolean
  }
  onChange: () => void
}) {
  const { alert } = useAppContext()

  const [inCollection, setInCollection] = useState(pop.userCollect)
  const [inWhislist, setInWhislist] = useState(pop.userWhislist)

  const router = useRouter()

  const handleAddToCollection = async () => {
    try {
      if (isUserLoggedIn()) {
        await toggleSaveInCollection({ id: pop.id })

        setInCollection(!inCollection)

        onChange()

        return
      }

      router.push('/account/login')
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleAddToWhislist = async () => {
    try {
      if (isUserLoggedIn()) {
        await toggleSaveInWhislist({ id: pop.id })

        setInWhislist(!inWhislist)

        onChange()

        return
      }

      router.push('/account/login')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className="flex flex-col gap-3 py-10 text-white">
      <GeneralButton
        onClick={handleAddToCollection}
        icon={
          inCollection ? (
            <IconBookmarkFill size="25px" />
          ) : (
            <IconBookmark size="25px" />
          )
        }
        tittle={inCollection ? 'Added to Collection' : 'Add to Collection'}
      ></GeneralButton>
      <GeneralButton
        onClick={handleAddToWhislist}
        icon={
          inWhislist ? <IconHeartFill size="25px" /> : <IconHeart size="25px" />
        }
        tittle={inWhislist ? 'Added to Whislist' : 'Add to Whislist'}
      ></GeneralButton>
    </div>
  )
}
