import Image from 'next/image'

export default function Header() {
  return (
    <header className="flex w-full bg-general-blue">
      <Image
        className="m-auto"
        src="/funko-logo.svg"
        alt="logo"
        width="110"
        height="80"
        quality="100"
        priority
      />
    </header>
  )
}
