import Button from '../library/Button'

interface GeneralButtonProps {
  icon?: JSX.Element
  tittle: string
  className?: string
  onClick?: () => void
}

export default function GeneralButton({
  icon,
  tittle,
  className,
  onClick,
}: GeneralButtonProps) {
  const buttonClass = `bg-general-blue rounded-3xl text-center justify-center shadow-lg gap-2 ${className}`
  const titleClass = 'text-white text-lg'

  if (icon !== undefined) {
    return (
      <Button className={buttonClass} onClick={onClick}>
        {icon}
        <span className={titleClass}>{tittle}</span>
      </Button>
    )
  }

  return (
    <Button className={buttonClass} onClick={onClick}>
      <span className={titleClass}>{tittle}</span>
    </Button>
  )
}
