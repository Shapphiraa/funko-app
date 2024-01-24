'use client'

import React from 'react'
import { Card, Skeleton } from '@nextui-org/react'

export default function Loading() {
  return (
    <Card className="w-auto h-full space-y-5 p-10 rounded-2xl">
      <Skeleton className="w-[150px] rounded-lg self-center">
        <div className="h-3 rounded-lg bg-general-blue bg-opacity-40"></div>
      </Skeleton>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="rounded-lg">
          <div className="w-full h-24 rounded-lg bg-general-blue bg-opacity-25"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="w-full h-24 rounded-lg bg-general-blue bg-opacity-25"></div>
        </Skeleton>
      </div>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-general-blue bg-opacity-40"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-general-blue bg-opacity-40"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-general-blue bg-opacity-25"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-general-blue bg-opacity-40"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-general-blue bg-opacity-25"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-general-blue bg-opacity-25"></div>
        </Skeleton>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="rounded-lg">
            <div className="w-full h-24 rounded-lg bg-general-blue bg-opacity-40"></div>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="w-full h-24 rounded-lg bg-general-blue bg-opacity-40"></div>
          </Skeleton>
        </div>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-general-blue bg-opacity-40"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-general-blue bg-opacity-25"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-general-blue bg-opacity-25"></div>
        </Skeleton>
      </div>
    </Card>
  )
}
