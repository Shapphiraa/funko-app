import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../handlers/handleRequest'
import registerUser from '../logic/registerUser'

interface Body {
  name: string
  email: string
  password: string
  repeatPassword: string
}

export async function POST(req: NextRequest) {
  return handleRequest(async () => {
    const body = await req.text()

    const { name, email, password, repeatPassword }: Body = JSON.parse(body)

    await registerUser({ name, email, password, repeatPassword })

    return NextResponse.json({ message: 'user registered' }, { status: 201 })
  })
}
