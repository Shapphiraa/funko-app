import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrieveUserRole from '../../logic/user/retrieveUserRole'
import extractUserId from '../../handlers/helpers/extractUserId'

export async function GET(req: NextRequest) {
  const userId = extractUserId(req)

  const promise = retrieveUserRole(userId)

  return handleRequest(async () => {
    const user = await promise

    return NextResponse.json(user)
  })
}
