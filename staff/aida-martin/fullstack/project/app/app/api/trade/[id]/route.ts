import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrieveSalePop from '../../logic/trade/retrieveSalePop'
import updateSalePop from '../../logic/trade/updateSalePop'
import extractUserId from '../../handlers/helpers/extractUserId'
import deleteSalePop from '../../logic/trade/deleteSalePop'
import { handleErrors } from '../../handlers/helpers/handleErrors'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(async () => {
    const salePop = await retrieveSalePop({ salePopId: params.id })

    return NextResponse.json(salePop)
  })
}

interface Body {
  description: string
  condition: string
  price: number
  images: Array<string>
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const body = await req.text()

      const { description, condition, price, images }: Body = JSON.parse(body)

      const userId = extractUserId(req)

      await updateSalePop({
        userId,
        salePopId: params.id,
        description,
        condition,
        price,
        images,
      })

      return new Response(null, { status: 204 })
    })
  })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const userId = extractUserId(req)

      await deleteSalePop(userId, params)

      return new Response(null, { status: 204 })
    })
  })
}
