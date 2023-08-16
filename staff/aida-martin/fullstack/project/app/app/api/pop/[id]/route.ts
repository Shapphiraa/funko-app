import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrievePop from '../../logic/pop/retrievePop'
import extractUserId from '../../handlers/helpers/extractUserId'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(async () => {
    const userId = extractUserId(req)

    const pop = await retrievePop({ userId, popId: params.id })

    return NextResponse.json(pop)
  })
}
