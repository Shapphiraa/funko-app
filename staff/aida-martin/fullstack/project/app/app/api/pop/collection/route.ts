import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import retrievePopCollection from '../../logic/pop/retrievePopCollection'
import extractUserId from '../../handlers/helpers/extractUserId'
import { handleErrors } from '../../handlers/helpers/handleErrors'

export async function GET(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const userId = extractUserId(req)

      const popCollection = await retrievePopCollection({ userId })

      return NextResponse.json(popCollection)
    })
  })
}
