import { validateToken } from './validators'

function extractPayloadFromToken(token) {
  return JSON.parse(atob(token.split('.')[1]))
}

export function isTokenAlive(token) {
  const { iat, exp } = extractPayloadFromToken(token)
  const now = Date.now() / 1000

  return exp - iat > now - iat
}

export function isTokenValid(token) {
  try {
    validateToken(token)

    return true
  } catch (_) {
    //da igual el error
    return false
  }
}

//Para extraer el userId y lo usamos en front:
export function extractSubFromToken(token) {
  const { sub } = extractPayloadFromToken(token)

  return sub
}
