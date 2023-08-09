interface ContainerProps {
  children: JSX.Element[]
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`flex flex-col bg-white rounded-3xl drop-shadow-lg ${className}`}
    >
      {children}
    </div>
  )
}
