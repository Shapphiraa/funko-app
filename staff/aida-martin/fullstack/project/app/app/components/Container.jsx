export default function Container({
  children,
  tag: Tag = 'div',
  className = 'bg-white w-[14rem] p-[2rem] flex flex-col m-auto rounded-xl shadow-lg',
  ...props
}) {
  return (
    <Tag className={`Container ${className}`} {...props}>
      {children}
    </Tag>
  )
}
