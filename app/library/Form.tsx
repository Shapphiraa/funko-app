export default function Form({
  children,
  onSubmit,
  className
}: {
  children: JSX.Element[]
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  className?: string
}) {
  return (
    <form
      className={`flex flex-col gap-[1.125rem] mt-4 mb-7 px-4 ${className}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
}
