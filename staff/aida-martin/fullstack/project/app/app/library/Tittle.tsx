interface TittleProps {
  name: string
  className?: string
}

export default function Tittle({ name, className }: TittleProps) {
  return (
    <h1 className={`text-2xl text-text-light text-center ${className}`}>
      {name}
    </h1>
  )
}
