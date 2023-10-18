import Link from 'next/link'

export default function ContainerLink({
  children,
  route,
}: {
  children: JSX.Element
  route: string
}) {
  return (
    <Link href={route} key={`key-${route}`}>
      {children}
    </Link>
  )
}
