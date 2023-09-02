import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrieveUserRole from '../../logic/user/retrieveUserRole'
import extractUserId from '../../handlers/helpers/extractUserId'
import { handleErrors } from '../../handlers/helpers/handleErrors'

export async function GET(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const userId = extractUserId(req)

      const userRole = await retrieveUserRole(userId)

      return NextResponse.json(userRole)
    })
  })
}
