interface InputProps {
  type: string
  name: string
  placeholder?: string
  defaultValue?: string
}

export default function Input({
  type,
  name,
  placeholder,
  defaultValue,
}: InputProps) {
  return (
    <input
      className="text-text-light border-0 bg-[#F6F6F6] rounded-xl p-2 outline-none text-lg"
      type={type}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      spellCheck={false}
    />
  )
}
