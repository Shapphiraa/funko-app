import dbConnect from '../data/dbConnect'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const handleRequest = async (
  callback:
    | (() => Promise<NextResponse<string>>)
    | (() => Promise<Response>)
    | (() => Promise<NextResponse<Array<object>>>)
    | (() => Promise<NextResponse<object>>)
    | (() => Promise<NextResponse<{ message: string }>>)
) => {
  try {
    await dbConnect()

    const headersList = headers()

    const contentType = headersList.get('Content-Type')

    if (contentType !== 'application/json') {
      NextResponse.json(
        { error: 'no application/json header found' },
        { status: 400 }
      )

      return
    }

    return await callback()
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export default handleRequest
