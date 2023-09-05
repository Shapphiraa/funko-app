import Link from 'next/link'

interface AccountLinkProps {
  text: string
  textLink: string
  route: string
}

export default function AccountLink({
  text,
  textLink,
  route,
}: AccountLinkProps) {
  return (
    <div className="flex mt-5 justify-center">
      <p className="text-[11px]">
        {text}
        <Link
          className="font-semibold underline underline-offset-2"
          href={route}
          as={route}
        >
          {textLink}
        </Link>
      </p>
    </div>
  )
}
