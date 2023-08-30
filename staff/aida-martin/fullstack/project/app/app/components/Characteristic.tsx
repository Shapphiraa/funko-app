export default function Characteristic({
  name,
  value,
}: {
  name: string
  value: string | number
}) {
  return (
    <li className="text-text-product-light text-xl font-semibold">
      {name}
      <span className="ml-4 font-normal">{value}</span>
    </li>
  )
}
