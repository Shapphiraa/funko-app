import { NextRequest } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import updateUserAvatar from '../../logic/user/updateUserAvatar'
import extractUserId from '../../handlers/helpers/extractUserId'

interface Body {
  avatar: string
}

export async function PATCH(req: NextRequest) {
  return handleRequest(async () => {
    const body = await req.text()

    const { avatar }: Body = JSON.parse(body)

    const userId = extractUserId(req)

    await updateUserAvatar({
      userId,
      avatar,
    })

    return new Response(null, { status: 204 })
  })
}
