import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../../handlers/handleRequest'
import toggleSalePopStatus from '../../../logic/trade/toggleSalePopStatus'
import extractUserId from '../../../handlers/helpers/extractUserId'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(async () => {
    const userId = extractUserId(req)

    await toggleSalePopStatus({
      userId,
      salePopId: params.id,
    })

    return new Response(null, { status: 204 })
  })
}
