import Button from '../library/Button'

interface GeneralButtonProps {
  icon?: JSX.Element
  tittle: string
}

export default function GeneralButton({ icon, tittle }: GeneralButtonProps) {
  const buttonClass =
    'bg-general-blue rounded-3xl text-center justify-center shadow-lg gap-2'
  const titleClass = 'text-white text-lg'

  if (icon !== undefined) {
    return (
      <Button className={buttonClass}>
        {icon}
        <span className={titleClass}>{tittle}</span>
      </Button>
    )
  }

  return (
    <Button className={buttonClass}>
      <span className={titleClass}>{tittle}</span>
    </Button>
  )
}
