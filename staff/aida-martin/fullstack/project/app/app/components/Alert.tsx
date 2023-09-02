import AccountContainer from './AccountContainer'
import GeneralButton from './GeneralButton'

export default function Alert({
  message,
  onAccept,
}: {
  message: string
  onAccept: () => void
}) {
  console.error(message)

  return (
    <>
      <div className="absolute bg-black opacity-25 h-full w-full"> </div>
      <AccountContainer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-9 w-[15rem] flex flex-col self-center m-auto gap-4 rounded-xl shadow-lg bg-white">
        <p className="text-text-light text-center text-lg">{message}</p>
        <GeneralButton tittle="Accept" onClick={onAccept} />
      </AccountContainer>
    </>
  )
}
