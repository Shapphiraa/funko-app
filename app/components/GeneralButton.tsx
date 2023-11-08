import Button from '../library/Button'

interface GeneralButtonProps {
  icon?: JSX.Element
  title: string
  className?: string
  color?: string
  onClick?: () => void
}

export default function GeneralButton({
  icon,
  title,
  className,
  color,
  onClick,
}: GeneralButtonProps) {
  const buttonClass = `bg-general-blue rounded-3xl text-center justify-center shadow-lg gap-2 ${className}`
  const titleClass = 'text-white text-lg lg:text-xl'

  if (icon) {
    return (
      <Button className={buttonClass} onClick={onClick}>
        {icon}
        <span className={titleClass}>{title}</span>
      </Button>
    )
  }

  if (color) {
    return (
      <Button
        className={`${color} rounded-3xl text-center justify-center shadow-lg gap-2 ${className}`}
        onClick={onClick}
      >
        <span className={titleClass}>{title}</span>
      </Button>
    )
  }

  return (
    <Button className={buttonClass} onClick={onClick}>
      <span className={titleClass}>{title}</span>
    </Button>
  )
}
