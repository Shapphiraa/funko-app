// export default function Container({
//   children,
//   tag: Tag = 'div',
//   className = 'bg-white w-[14rem] p-[2rem] flex flex-col m-auto rounded-xl shadow-lg',
//   ...props
// }) {
//   return (
//     <Tag className={`Container ${className}`} {...props}>
//       {children}
//     </Tag>
//   )
// }

// For account (register, login...)

interface ContainerProps {
  children: JSX.Element[]
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`flex flex-col bg-white rounded-3xl drop-shadow-lg ${className}`}
    >
      {children}
    </div>
  )
}
