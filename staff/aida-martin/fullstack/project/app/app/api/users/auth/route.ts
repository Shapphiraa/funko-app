import { NextRequest, NextResponse } from 'next/server'
import handleRequest from '../../handlers/handleRequest'
import authenticateUser from '../../logic/authenticateUser'
import jwt from 'jsonwebtoken'

interface Body {
  email: string
  password: string
}

export async function POST(req: NextRequest) {
  return handleRequest(async () => {
    const body = await req.text()

    const { email, password }: Body = JSON.parse(body)

    const userId = await authenticateUser(email, password)

    const payload = { sub: userId }

    // Typescript: el jwt puede venir undefined y se queja. Una solución:
    // const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET ?? ''
    // La otra es ponerle el ! para decirle que siempre le va a llegar algo (nunca undefined)

    const { JWT_SECRET, JWT_EXPIRATION } = process.env

    const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRATION })

    return NextResponse.json(token)
  })
}
