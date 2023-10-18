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
import useAppContext from '@/app/hooks/useAppContext'

export default function AddListsButtons({
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
    <div className="flex drop-shadow-lg items-center justify-center mt-auto text-white">
      <button
        onClick={handleAddToWhislist}
        className="bg-general-blue p-[6px_2px_6px_16px] flex items-center justify-center rounded-2xl rounded-r-none "
      >
        {inWhislist ? <IconHeartFill size="24px" /> : <IconHeart size="24px" />}
      </button>
      <button
        onClick={handleAddToCollection}
        className="bg-general-blue p-[6px_16px_6px_2px] flex items-center justify-center rounded-2xl rounded-l-none "
      >
        {inCollection ? (
          <IconBookmarkFill size="24px" />
        ) : (
          <IconBookmark size="24px" />
        )}
      </button>
    </div>
  )
}
