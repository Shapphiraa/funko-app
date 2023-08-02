import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../handlers/handleRequest'
import createPop from '../logic/createPop'
import retrievePops from '../logic/retrievePops'
import extractUserId from '../handlers/helpers/extractUserId'

interface Body {
  variant: string
  exclusivity: string
  name: string
  number: number
  images: Array<string>
  category: string
  collect: string
  release: string
  availability: string
}

export async function POST(req: NextRequest) {
  return handleRequest(async () => {
    const body = await req.text()

    const userId = extractUserId(req)

    const {
      variant,
      exclusivity,
      name,
      number,
      images,
      category,
      collect,
      release,
      availability,
    }: Body = JSON.parse(body)

    await createPop({
      userId,
      variant,
      exclusivity,
      name,
      number,
      images,
      category,
      collect,
      release,
      availability,
    })

    return NextResponse.json({ message: 'pop created' }, { status: 201 })
  })
}

export async function GET() {
  return handleRequest(async () => {
    const pops = await retrievePops()

    return NextResponse.json(pops)
  })
}
