import { Spinner } from '@nextui-org/react'

export default function Loader() {
  return (
    <div className="h-[500px] flex flex-col w-full items-center justify-center">
      <Spinner className="w-auto m-auto" />
    </div>
  )
}
