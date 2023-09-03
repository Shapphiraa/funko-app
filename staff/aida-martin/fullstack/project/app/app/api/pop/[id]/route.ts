import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrievePop from '../../logic/pop/retrievePop'
import updatePop from '../../logic/pop/updatePop'
import extractUserId from '../../handlers/helpers/extractUserId'
import deletePop from '../../logic/pop/deletePop'
import { handleErrors } from '../../handlers/helpers/handleErrors'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const userId = extractUserId(req)

      const pop = await retrievePop({ userId, popId: params.id })

      return NextResponse.json(pop)
    })
  })
}

interface Body {
  variant: string
  exclusivity: string
  name: string
  number: string
  category: string
  images: Array<string>
  collect: string
  release: string
  availability: string
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const body = await req.text()

      const {
        variant,
        exclusivity,
        name,
        number,
        category,
        images,
        collect,
        release,
        availability,
      }: Body = JSON.parse(body)

      const userId = extractUserId(req)

      await updatePop({
        userId,
        popId: params.id,
        variant,
        exclusivity,
        name,
        number,
        category,
        images,
        collect,
        release,
        availability,
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

      await deletePop(userId, params)

      return new Response(null, { status: 204 })
    })
  })
}
