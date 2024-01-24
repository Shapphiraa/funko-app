import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../handlers/handleRequest'
import createPop from '../logic/pop/createPop'
import retrievePops from '../logic/pop/retrievePops'
import extractUserId from '../handlers/helpers/extractUserId'
import { handleErrors } from '../handlers/helpers/handleErrors'

interface Body {
  variant: string
  exclusivity: string
  name: string
  number: string
  images: Array<string>
  category: string
  collect: string
  release: string
  availability: string
}

export async function POST(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
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
  })
}

export async function GET(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      // Convertir el URLSearchParams a objeto (antes solo devolvía un URLSearchParams)
      const filter = Object.fromEntries(req.nextUrl.searchParams)

      const userId = extractUserId(req)

      const pops = await retrievePops({ userId, filter })

      return NextResponse.json(pops)
    })
  })
}
