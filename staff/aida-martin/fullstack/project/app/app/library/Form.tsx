export default function Form({
  children,
  onSubmit,
}: {
  children: JSX.Element[]
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}) {
  return (
    <form
      className="flex flex-col gap-[1.125rem] mt-4 mb-7 px-4"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
}
