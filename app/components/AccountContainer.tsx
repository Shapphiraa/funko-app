interface AccountContainerProps {
  children: JSX.Element[] | JSX.Element
  className?: string
}

export default function AccountContainer({
  children,
  className = 'bg-white w-[18rem] p-[2rem] flex flex-col m-auto rounded-2xl shadow-xl',
}: AccountContainerProps) {
  return <div className={className}>{children}</div>
}
