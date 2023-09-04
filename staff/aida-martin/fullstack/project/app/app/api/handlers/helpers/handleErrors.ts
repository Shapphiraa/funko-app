import { NextResponse } from 'next/server'
import {
  DuplicityError,
  ContentError,
  AuthError,
  ExistenceError,
  PropertyError,
} from '../../../helpers'

export async function handleErrors(callback: any) {
  try {
    return await callback()
  } catch (error) {
    return respondError(error)
  }
}

function respondError(error: any) {
  let status = 500

  if (error instanceof DuplicityError || error instanceof PropertyError)
    status = 409
  else if (error instanceof ExistenceError) status = 404
  else if (error instanceof AuthError) status = 401

  if (
    error instanceof TypeError ||
    error instanceof ContentError ||
    error instanceof RangeError
  )
    status = 406

  return NextResponse.json(
    {
      message: error.message,
      type: error.name,
    },
    { status }
  )
}
