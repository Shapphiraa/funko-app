interface OptionType {
  key: string
  value: string
  label: string
}

interface SelectProps {
  options: OptionType[]
  defaultValue?: string
  disabled?: boolean
  size?: number
  name: string
  id: string
}

export default function Select({
  options,
  defaultValue,
  disabled,
  size,
  name,
  id,
}: SelectProps) {
  return (
    <>
      <select
        className="h[1.75rem] text-text-light border-0 bg-[#F6F6F6] rounded-xl p-2 outline-none text-lg"
        name={name}
        id={id}
        defaultValue={defaultValue}
        disabled={disabled}
        size={size}
      >
        {options.map((option) => (
          <option className="" value={option.value} key={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
