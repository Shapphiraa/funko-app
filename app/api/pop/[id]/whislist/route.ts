import { NextRequest } from 'next/server'
import handleRequest from '../../../handlers/handleRequest'
import extractUserId from '../../../handlers/helpers/extractUserId'
import toggleSaveInWhislist from '../../../logic/pop/toggleSaveInWhislist'
import { handleErrors } from '@/app/api/handlers/helpers/handleErrors'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const userId = extractUserId(req)

      await toggleSaveInWhislist(userId, params)

      // Poner un 204 con NextResponse da error porque no debe devolver nada y no se puede poner tal cual.Hay que usar new Response
      return new Response(null, { status: 204 })
    })
  })
}
