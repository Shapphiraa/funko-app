import { FormEvent, useRef, useState } from 'react'
import { IconClear, IconSearch } from './Icons'

export default function Search({
  className,
  onSubmit,
}: {
  className?: string
  onSubmit: (search: string) => void
}) {
  const searchRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState<string>('')

  const handleClear = async () => {
    setSearch('')
    searchRef.current!.value = ''
    onSubmit('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    onSubmit(searchRef.current!.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={`flex justify-center mt-5 mb-4 text-text-light ${className}`}>
        <input
          className="w-full border-0 bg-[#f0efef] rounded-2xl px-3 outline-none text-lg rounded-r-none autofill-none lg:w-[300px] lg:text-xl"
          type="text"
          name="search"
          placeholder="Search by name"
          spellCheck={false}
          autoComplete="off"
          ref={searchRef}
          onChange={(event) => {
            setSearch(event.target.value)
          }}
        ></input>
        {!search.length && (
                    <button
                    type="button"
                    className="bg-[#f0efef] w-[44px] h-[44px] rounded-2xl rounded-l-none rounded-r-none"
                  >
                    </button>
        )}
        {search.length > 0 && (
          <button
            type="button"
            className="bg-[#f0efef] p-3 rounded-2xl rounded-l-none rounded-r-none"
          >
            
            <IconClear size="20px" onClick={handleClear}></IconClear>
            </button>
        )}

        <button
          type="submit"
          className="bg-[#f0efef] p-3 rounded-2xl rounded-l-none"
        >
          <IconSearch size="18px"></IconSearch>
        </button>
      </div>
    </form>
  )
}
