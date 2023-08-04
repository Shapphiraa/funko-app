import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrieveCategory from '../../logic/retrieveCategory'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  return handleRequest(async () => {
    const category = await retrieveCategory(params)

    return NextResponse.json(category)
  })
}
