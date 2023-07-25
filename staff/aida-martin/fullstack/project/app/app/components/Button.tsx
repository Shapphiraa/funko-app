interface ButtonProps {
  children: JSX.Element
  className?: string
}

export default function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={`bg-general-blue justify-self-end p-[6px] flex items-center rounded-xl ${className}`}
    >
      {children}
    </button>
  )
}
