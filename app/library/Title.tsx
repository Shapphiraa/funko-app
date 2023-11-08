interface TitleProps {
  name: string
  className?: string
}

export default function Title({ name, className }: TitleProps) {
  return (
    <h1 className={`text-2xl lg:text-3xl text-text-light text-center ${className}`}>
      {name}
    </h1>
  )
}
