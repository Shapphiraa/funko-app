import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrieveSalePop from '../../logic/trade/retrieveSalePop'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(async () => {
    const salePop = await retrieveSalePop({ salePopId: params.id })

    return NextResponse.json(salePop)
  })
}
