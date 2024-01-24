import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../handlers/handleRequest'
import registerUser from '../logic/user/registerUser'
import retrieveUser from '../logic/user/retrieveUser'
import extractUserId from '../handlers/helpers/extractUserId'
import { handleErrors } from '../handlers/helpers/handleErrors'

interface BodyPost {
  name: string
  email: string
  password: string
  repeatPassword: string
}

export async function POST(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const body = await req.text()

      const { name, email, password, repeatPassword }: BodyPost =
        JSON.parse(body)

      await registerUser({ name, email, password, repeatPassword })

      return new Response(null, { status: 201 })
    })
  })
}

export async function GET(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const userId = extractUserId(req)

      const user = await retrieveUser(userId)

      return NextResponse.json(user)
    })
  })
}
