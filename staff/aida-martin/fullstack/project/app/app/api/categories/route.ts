import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../handlers/handleRequest'
import createCategory from '../logic/createCategory'
import extractUserId from '../handlers/helpers/extractUserId'

interface Body {
  name: string
  imageList: string
  imageDetail: string
}

export async function POST(req: NextRequest) {
  return handleRequest(async () => {
    const body = await req.text()

    const userId = extractUserId(req)

    const { name, imageList, imageDetail }: Body = JSON.parse(body)

    await createCategory({
      userId,
      name,
      imageList,
      imageDetail,
    })

    return NextResponse.json({ message: 'category created' }, { status: 201 })
  })
}
