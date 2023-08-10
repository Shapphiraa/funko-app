'use client'

import { redirect } from 'next/navigation'
import isUserLoggedIn from '../logic/isUserLoggedIn'

export default function Account() {
  if (!isUserLoggedIn()) redirect('/account/login')

  return <h1>Welcome!</h1>
}
