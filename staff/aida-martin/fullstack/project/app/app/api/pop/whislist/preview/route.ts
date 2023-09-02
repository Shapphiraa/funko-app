import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../../handlers/handleRequest'
import retrievePopWhislistPreview from '../../../logic/pop/retrievePopWhislistPreview'
import extractUserId from '../../../handlers/helpers/extractUserId'
import { handleErrors } from '@/app/api/handlers/helpers/handleErrors'

export async function GET(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const userId = extractUserId(req)

      const preview = await retrievePopWhislistPreview({ userId })

      return NextResponse.json(preview)
    })
  })
}
