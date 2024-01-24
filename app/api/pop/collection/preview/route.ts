import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../../handlers/handleRequest'
import retrievePopCollectionPreview from '../../../logic/pop/retrievePopCollectionPreview'
import extractUserId from '../../../handlers/helpers/extractUserId'
import { handleErrors } from '@/app/api/handlers/helpers/handleErrors'

export async function GET(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const userId = extractUserId(req)

      const preview = await retrievePopCollectionPreview({ userId })

      return NextResponse.json(preview)
    })
  })
}
