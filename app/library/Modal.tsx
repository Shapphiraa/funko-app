interface ModalProps {
  children: JSX.Element[] | JSX.Element
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="fixed m-0 h-full w-full flex align-center justify-center z-2">
      {children}
    </div>
  )
}
