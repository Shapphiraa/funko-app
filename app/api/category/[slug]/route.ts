import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrieveCategory from '../../logic/category/retrieveCategory'
import { handleErrors } from '../../handlers/helpers/handleErrors'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const category = await retrieveCategory(params)

      return NextResponse.json(category)
    })
  })
}
