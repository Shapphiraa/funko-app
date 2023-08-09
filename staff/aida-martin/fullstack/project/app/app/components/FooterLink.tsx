'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import isUserLoggedIn from '../logic/isUserLoggedIn'

interface FooterLinkProps {
  route: string
  icon: JSX.Element
  iconFill: JSX.Element
  name: string
  requiredLogin: boolean
}

export default function FooterLink({
  route,
  icon,
  iconFill,
  name,
  requiredLogin,
}: FooterLinkProps) {
  const currentRoute = usePathname()

  const isInRoute =
    route === '/' ? currentRoute === '/' : currentRoute.includes(route)

  return (
    <Link
      href={requiredLogin && !isUserLoggedIn() ? '/account/login' : route}
      className="font-light p-2 flex flex-col items-center"
    >
      <span>{isInRoute ? iconFill : icon}</span>
      <span>{name}</span>
    </Link>
  )
}
