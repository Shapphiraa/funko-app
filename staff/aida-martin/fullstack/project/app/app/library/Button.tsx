import { MouseEventHandler } from 'react'

interface ButtonProps {
  children: JSX.Element | JSX.Element[] | string
  className?: string
  type?: 'submit' | 'reset' | 'button' | undefined
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  children,
  className,
  type,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`justify-self-end py-[6px] px-[10px] flex items-center ${className}`}
    >
      {children}
    </button>
  )
}
