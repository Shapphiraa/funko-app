import { NextRequest } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import updateUserName from '../../logic/user/updateUserName'
import extractUserId from '../../handlers/helpers/extractUserId'
import { handleErrors } from '../../handlers/helpers/handleErrors'

interface Body {
  name: string
}

export async function PATCH(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const body = await req.text()

      const { name }: Body = JSON.parse(body)

      const userId = extractUserId(req)

      await updateUserName({
        userId,
        name,
      })

      return new Response(null, { status: 204 })
    })
  })
}
