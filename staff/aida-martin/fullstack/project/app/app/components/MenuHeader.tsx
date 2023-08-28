import Tittle from '../library/Tittle'
import Button from '../library/Button'
import BackArrow from './BackArrow'
import ContainerLink from './ContainerLink'

export default function MenuHeader({
  name,
  route,
  text,
  direction,
  permission,
  onClick,
}: {
  name: string
  route?: string
  text?: string
  direction?: string
  permission?: boolean
  onClick?: () => void
}) {
  return (
    <div className="px-4 grid grid-cols-[40px_1fr_40px] mb-3">
      {route && <BackArrow />}
      <Tittle className="col-start-2" name={name} />

      {text && direction && (
        <ContainerLink route={direction}>
          <Button
            className={
              'bg-general-blue self-center shadow-lg rounded-xl text-lg text-white'
            }
          >
            {text}
          </Button>
        </ContainerLink>
      )}

      {permission && (
        <>
          <Button
            onClick={onClick}
            className={
              'bg-general-blue self-center shadow-lg rounded-xl text-lg text-white'
            }
          >
            {text!}
          </Button>
        </>
      )}
    </div>
  )
}
