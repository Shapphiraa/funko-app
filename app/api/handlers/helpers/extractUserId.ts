const jwt = require('jsonwebtoken')
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

export default function extractUserId(req: NextRequest) {
  const headersList = headers()

  const authorization = headersList.get('Authorization')

  // La autorización vendrá así: "Bearer user-id"

  if (authorization) {
    const token = authorization!.slice(7)

    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const { sub: userId } = payload

    return userId
  }
}
