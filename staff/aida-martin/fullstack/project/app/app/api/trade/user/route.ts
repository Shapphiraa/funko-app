import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import extractUserId from '../../handlers/helpers/extractUserId'
import retrieveUserSalePops from '../../logic/trade/retrieveUserSalePops'

export async function GET(req: NextRequest) {
  return handleRequest(async () => {
    const userId = extractUserId(req)

    const userSalePops = await retrieveUserSalePops({ userId })

    return NextResponse.json(userSalePops)
  })
}
