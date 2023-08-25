import { validateToken } from '../../helpers/validators'

function extractPayloadFromToken(token: string) {
  return JSON.parse(atob(token.split('.')[1]))
}

export function isTokenAlive(token: string) {
  const { iat, exp } = extractPayloadFromToken(token)
  const now = Date.now() / 1000

  return exp - iat > now - iat
}

export function isTokenValid(token: string) {
  try {
    validateToken(token)

    return true
  } catch (_) {
    //da igual el error
    return false
  }
}

//Para extraer el userId y lo usamos en front:
export function extractSubFromToken(token: string) {
  const { sub } = extractPayloadFromToken(token)

  return sub
}
