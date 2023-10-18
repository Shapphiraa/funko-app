import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../handlers/handleRequest'
import createSalePop from '../logic/trade/createSalePop'
import extractUserId from '../handlers/helpers/extractUserId'
import retrieveSalePops from '../logic/trade/retrieveSalePops'
import { handleErrors } from '../handlers/helpers/handleErrors'

interface Body {
  description: string
  condition: string
  pop: string
  images: Array<string>
  price: number
}

export async function POST(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const body = await req.text()

      const userId = extractUserId(req)

      const { description, condition, pop, images, price }: Body =
        JSON.parse(body)

      await createSalePop({
        userId,
        description,
        condition,
        pop,
        images,
        price,
      })

      return NextResponse.json({ message: 'sale pop created' }, { status: 201 })
    })
  })
}

export async function GET() {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const salePops = await retrieveSalePops()

      return NextResponse.json(salePops)
    })
  })
}
