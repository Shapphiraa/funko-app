import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../handlers/handleRequest'
import createCategory from '../logic/category/createCategory'
import retrieveCategories from '../logic/category/retrieveCategories'
import extractUserId from '../handlers/helpers/extractUserId'
import { handleErrors } from '../handlers/helpers/handleErrors'

interface Body {
  name: string
  imageList: string
  imageDetail: string
}

export async function POST(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const body = await req.text()

      const userId = extractUserId(req)

      const { name, imageList, imageDetail }: Body = JSON.parse(body)

      await createCategory({
        userId,
        name,
        imageList,
        imageDetail,
      })

      return NextResponse.json({ status: 201 })
    })
  })
}

export async function GET() {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const categories = await retrieveCategories()

      return NextResponse.json(categories)
    })
  })
}
