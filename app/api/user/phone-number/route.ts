import { NextRequest } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import updateUserPhoneNumber from '../../logic/user/updateUserPhoneNumber'
import extractUserId from '../../handlers/helpers/extractUserId'
import { handleErrors } from '../../handlers/helpers/handleErrors'

interface Body {
  phoneNumber: string
}

export async function PATCH(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const body = await req.text()

      const { phoneNumber }: Body = JSON.parse(body)

      const userId = extractUserId(req)

      await updateUserPhoneNumber({
        userId,
        phoneNumber,
      })

      return new Response(null, { status: 204 })
    })
  })
}
