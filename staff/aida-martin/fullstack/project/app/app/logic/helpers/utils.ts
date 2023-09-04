import { ContentError } from '@/app/helpers'

/**
 * Validates the token
 *
 * @param token The token to validate
 * @param explain The word to specity the errors
 *
 */

function validateToken(token: string, explain = 'Token') {
  if (typeof token !== 'string')
    throw new TypeError(`${explain} is not a string 😥`)
  if (token.split('.').length !== 3)
    throw new ContentError(`${explain} is not valid 😥`)
}

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
