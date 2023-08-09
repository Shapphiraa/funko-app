interface ButtonProps {
  children: JSX.Element | JSX.Element[]
  className?: string
}

export default function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={`justify-self-end p-[6px] flex items-center ${className}`}
    >
      {children}
    </button>
  )
}
