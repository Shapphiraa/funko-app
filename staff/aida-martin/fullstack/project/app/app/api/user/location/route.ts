import { NextRequest } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import updateUserLocation from '../../logic/user/updateUserLocation'
import extractUserId from '../../handlers/helpers/extractUserId'

interface Body {
  location: string
}

export async function PATCH(req: NextRequest) {
  return handleRequest(async () => {
    const body = await req.text()

    const { location }: Body = JSON.parse(body)

    const userId = extractUserId(req)

    await updateUserLocation({
      userId,
      location,
    })

    return new Response(null, { status: 204 })
  })
}
