import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import authenticateUser from '../../logic/user/authenticateUser'
import jwt from 'jsonwebtoken'
import { handleErrors } from '../../handlers/helpers/handleErrors'

interface Body {
  email: string
  password: string
}

export async function POST(req: NextRequest) {
  return handleErrors(async () => {
    return await handleRequest(async () => {
      const body = await req.text()

      const { email, password }: Body = JSON.parse(body)

      const userId = await authenticateUser({ email, password })

      const payload = { sub: userId }

      const { JWT_SECRET, JWT_EXPIRATION } = process.env

      const token = jwt.sign(payload, JWT_SECRET!, {
        expiresIn: JWT_EXPIRATION,
      })

      return NextResponse.json(token)
    })
  })
}
