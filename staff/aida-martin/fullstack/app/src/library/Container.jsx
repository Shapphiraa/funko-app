import './Container.css'

export default function Container ({ children, tag: Tag = 'div', className = '', ...props }) {
  return (
    <Tag className={`Container ${className}`} {...props}>
      {children}
    </Tag>
  )
}
