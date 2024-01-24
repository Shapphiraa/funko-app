import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrievePopWhislist from '../../logic/pop/retrievePopWhislist'
import extractUserId from '../../handlers/helpers/extractUserId'
import { handleErrors } from '../../handlers/helpers/handleErrors'

export async function GET(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const userId = extractUserId(req)

      const popWhislist = await retrievePopWhislist({ userId })

      return NextResponse.json(popWhislist)
    })
  })
}
