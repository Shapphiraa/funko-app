import Button from '../library/Button'

interface GeneralButtonProps {
  icon?: JSX.Element
  tittle: string
  className?: string
  color?: string
  onClick?: () => void
}

export default function GeneralButton({
  icon,
  tittle,
  className,
  color,
  onClick,
}: GeneralButtonProps) {
  const buttonClass = `bg-general-blue rounded-3xl text-center justify-center shadow-lg gap-2 ${className}`
  const tittleClass = 'text-white text-lg'

  if (icon) {
    return (
      <Button className={buttonClass} onClick={onClick}>
        {icon}
        <span className={tittleClass}>{tittle}</span>
      </Button>
    )
  }

  if (color) {
    return (
      <Button
        className={`${color} rounded-3xl text-center justify-center shadow-lg gap-2 ${className}`}
        onClick={onClick}
      >
        <span className={tittleClass}>{tittle}</span>
      </Button>
    )
  }

  return (
    <Button className={buttonClass} onClick={onClick}>
      <span className={tittleClass}>{tittle}</span>
    </Button>
  )
}
