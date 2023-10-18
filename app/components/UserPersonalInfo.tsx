import { MouseEventHandler } from 'react'
import Button from '../library/Button'
import { IconEdit } from './Icons'

interface UserPersonalInfoProps {
  label: string
  value: string
  onEdit?: MouseEventHandler<HTMLButtonElement>
}

export default function UserPersonalInfo({
  label,
  value,
  onEdit,
}: UserPersonalInfoProps) {
  return (
    <div className="flex place-content-between items-center py-2">
      <p className="text-lg text-text-light font-medium">{label}</p>
      <div className="flex items-center gap-3 text-general-blue">
        <p className="text-lg text-text-light">{value}</p>
        <Button onClick={onEdit}>
          <IconEdit size="24px" />
        </Button>
      </div>
    </div>
  )
}
