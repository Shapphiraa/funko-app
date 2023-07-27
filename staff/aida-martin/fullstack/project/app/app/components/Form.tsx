export default function Form({ children }: { children: JSX.Element[] }) {
  return (
    <form className="flex flex-col gap-[1.125rem] mt-4 mb-7">{children}</form>
  )
}
