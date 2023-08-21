import { MouseEventHandler } from 'react'

interface ButtonProps {
  children: JSX.Element | JSX.Element[] | string
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`justify-self-end py-[6px] px-[10px] flex items-center ${className}`}
    >
      {children}
    </button>
  )
}
