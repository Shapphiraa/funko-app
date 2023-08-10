import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrievePop from '../../logic/pop/retrievePop'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(async () => {
    const pop = await retrievePop(params)

    return NextResponse.json(pop)
  })
}
