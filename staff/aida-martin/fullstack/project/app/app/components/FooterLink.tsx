'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface FooterLinkProps {
  route: string
  icon: JSX.Element
  iconFill: JSX.Element
  name: string
}

export default function FooterLink({
  route,
  icon,
  iconFill,
  name,
}: FooterLinkProps) {
  const currentRoute = usePathname()

  const isInRoute =
    route === '/'
      ? currentRoute === '/'
      : currentRoute !== null
      ? currentRoute.includes(route)
      : false

  return (
    <Link
      href={route}
      as={route}
      className="font-light p-2 flex flex-col items-center"
    >
      <span>{isInRoute ? iconFill : icon}</span>
      {name}
    </Link>
  )
}
