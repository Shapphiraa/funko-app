import { NextRequest } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import updateUserPassword from '../../logic/user/updateUserPassword'
import extractUserId from '../../handlers/helpers/extractUserId'

interface Body {
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export async function PATCH(req: NextRequest) {
  return handleRequest(async () => {
    const body = await req.text()

    const { password, newPassword, newPasswordConfirm }: Body = JSON.parse(body)

    const userId = extractUserId(req)

    await updateUserPassword({
      userId,
      password,
      newPassword,
      newPasswordConfirm,
    })

    return new Response(null, { status: 204 })
  })
}
