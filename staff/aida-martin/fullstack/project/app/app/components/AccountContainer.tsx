interface AccountContainerProps {
  children: JSX.Element[]
  className?: string
}

export default function AccountContainer({
  children,
  className = 'bg-white w-[16rem] p-[2rem] flex flex-col m-auto rounded-xl shadow-xl',
}: AccountContainerProps) {
  return <section className={className}>{children}</section>
}