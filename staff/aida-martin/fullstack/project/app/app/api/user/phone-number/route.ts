import { NextRequest } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import updateUserPhoneNumber from '../../logic/user/updateUserPhoneNumber'
import extractUserId from '../../handlers/helpers/extractUserId'

interface Body {
  phoneNumber: string
}

export async function PATCH(req: NextRequest) {
  return handleRequest(async () => {
    const body = await req.text()

    const { phoneNumber }: Body = JSON.parse(body)

    const userId = extractUserId(req)

    await updateUserPhoneNumber({
      userId,
      phoneNumber,
    })

    return new Response(null, { status: 204 })
  })
}
