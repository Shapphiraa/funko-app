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
    route === '/' ? currentRoute === '/' : currentRoute.includes(route)

  return (
    <Link href={route} className="font-light p-2 flex flex-col items-center">
      <span>{isInRoute ? iconFill : icon}</span>
      <span>{name}</span>
    </Link>
  )
}
