import { NextRequest } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import updateUserEmail from '../../logic/user/updateUserEmail'
import extractUserId from '../../handlers/helpers/extractUserId'

interface Body {
  email: string
}

export async function PATCH(req: NextRequest) {
  return handleRequest(async () => {
    const body = await req.text()

    const { email }: Body = JSON.parse(body)

    const userId = extractUserId(req)

    await updateUserEmail({
      userId,
      email,
    })

    return new Response(null, { status: 204 })
  })
}