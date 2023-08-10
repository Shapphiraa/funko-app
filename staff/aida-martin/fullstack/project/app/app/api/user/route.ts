import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../handlers/handleRequest'
import registerUser from '../logic/user/registerUser'
import retrieveUser from '../logic/user/retrieveUser'
import extractUserId from '../handlers/helpers/extractUserId'

interface BodyPost {
  name: string
  email: string
  password: string
  repeatPassword: string
}

export async function POST(req: NextRequest) {
  return handleRequest(async () => {
    const body = await req.text()

    const { name, email, password, repeatPassword }: BodyPost = JSON.parse(body)

    await registerUser({ name, email, password, repeatPassword })

    return NextResponse.json({ message: 'user registered' }, { status: 201 })
  })
}

export async function GET(req: NextRequest) {
  const userId = extractUserId(req)

  const promise = retrieveUser(userId)

  return handleRequest(async () => {
    const user = await promise

    return NextResponse.json(user)
  })
}
