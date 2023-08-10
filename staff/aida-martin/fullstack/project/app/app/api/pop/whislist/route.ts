import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrievePopWhislist from '../../logic/pop/retrievePopWhislist'
import extractUserId from '../../handlers/helpers/extractUserId'

export async function GET(req: NextRequest) {
  return handleRequest(async () => {
    const userId = extractUserId(req)

    const popWhislist = await retrievePopWhislist({ userId })

    return NextResponse.json(popWhislist)
  })
}
