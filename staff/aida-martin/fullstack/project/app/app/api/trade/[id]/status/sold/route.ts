import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../../../handlers/handleRequest'
import extractUserId from '../../../../handlers/helpers/extractUserId'
import changeSalePopStatusToSold from '@/app/api/logic/trade/changeSalePopStatusToSold'
import { handleErrors } from '@/app/api/handlers/helpers/handleErrors'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const userId = extractUserId(req)

      await changeSalePopStatusToSold({
        userId,
        salePopId: params.id,
      })

      return new Response(null, { status: 204 })
    })
  })
}
