import { MouseEventHandler } from 'react'

interface ButtonProps {
  children: JSX.Element | JSX.Element[]
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`justify-self-end p-[6px] flex items-center ${className}`}
    >
      {children}
    </button>
  )
}
