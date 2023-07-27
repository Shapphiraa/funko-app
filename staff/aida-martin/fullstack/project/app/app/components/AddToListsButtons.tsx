'use client'

import { useState } from 'react'
import {
  IconHeart,
  IconHeartFill,
  IconBookmark,
  IconBookmarkFill,
} from './Icons'

export default function AddListsButtons() {
  const [whislist, setWhislist] = useState(false)
  const [collection, setCollection] = useState(false)

  const handleAddToWhislist = () => {
    setWhislist(!whislist)
  }

  const handleAddToCollection = () => {
    setCollection(!collection)
  }

  return (
    <div className="flex drop-shadow-lg items-center justify-center mt-auto text-white">
      <button
        onClick={handleAddToWhislist}
        className="bg-general-blue p-[6px_2px_6px_16px] flex items-center justify-center rounded-tl-2xl rounded-bl-2xl"
      >
        {!whislist ? <IconHeart size="24px" /> : <IconHeartFill size="24px" />}
      </button>
      <button
        onClick={handleAddToCollection}
        className="bg-general-blue p-[6px_16px_6px_2px] flex items-center justify-center rounded-tr-2xl rounded-br-2xl"
      >
        {!collection ? (
          <IconBookmark size="24px" />
        ) : (
          <IconBookmarkFill size="24px" />
        )}
      </button>
    </div>
  )
}
