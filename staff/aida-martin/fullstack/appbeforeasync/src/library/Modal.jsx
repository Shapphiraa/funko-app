import './Modal.css'

export default function Modal ({ children, tag: Tag = 'div' }) {
  return (
    <Tag className='Modal'>
      {children}
    </Tag>
  )
}
