interface InputProps {
  type: string
  name: string
  placeholder: string
}

export default function Input({ type, name, placeholder }: InputProps) {
  return (
    <input
      className="h[1.75rem] text-black border-0 bg-[#F6F6F6] rounded-xl p-2 outline-none"
      type={type}
      name={name}
      placeholder={placeholder}
    />
  )
}
