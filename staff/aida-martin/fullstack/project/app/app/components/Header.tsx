import Image from 'next/image'
import Button from './Button'
import { IconSearch } from './Icons'

export default function Header() {
  return (
    <header className="grid grid-cols-3 h-auto bg-general-blue">
      <Image
        className="justify-self-center col-start-2"
        src="/funko-logo.svg"
        alt="logo"
        width="110"
        height="80"
        quality="100"
      />

      <Button className="bg-general-blue mr-3 rounded-xl">
        <IconSearch size="20px" />
      </Button>
    </header>
  )
}
