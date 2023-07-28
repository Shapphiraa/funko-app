'use client'

import { IconArrowLeft } from './Icons'
import { useRouter } from 'next/navigation'

export default function BackArrow() {
  const router = useRouter()
  return (
    <button
      className="text-general-blue flex items-center justify-center h-9 w-9"
      onClick={() => router.back()}
    >
      <IconArrowLeft size="24px"></IconArrowLeft>
    </button>
  )
}
