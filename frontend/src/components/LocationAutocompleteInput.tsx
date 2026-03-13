import { useEffect, useState } from 'react'
import {
  searchLocations,
  type LocationSuggestion,
} from '../api/locationApi'

type LocationAutocompleteInputProps = {
  icon: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  actionIcon?: string
}

export function LocationAutocompleteInput({
  icon,
  placeholder,
  value,
  onChange,
  actionIcon,
}: LocationAutocompleteInputProps) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([])
      return
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        setLoading(true)
        const results = await searchLocations(value)
        setSuggestions(results)
      } catch {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => window.clearTimeout(timeoutId)
  }, [value])

  return (
    <div className="relative">
      <div className="relative rounded-2xl bg-[#e9e9e9] px-5 py-5">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-black">
          {icon}
        </span>
        <input
          className="w-full bg-transparent pl-8 pr-10 text-lg text-black outline-none placeholder:text-slate-500"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        />
        {actionIcon ? (
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-black">
            {actionIcon}
          </span>
        ) : null}
      </div>

      {open && (loading || suggestions.length > 0) ? (
        <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/10">
          {loading ? (
            <div className="px-4 py-3 text-sm text-slate-500">
              Loading locations...
            </div>
          ) : null}
          {!loading &&
            suggestions.map((suggestion) => (
              <button
                key={suggestion.label}
                className="block w-full border-b border-slate-100 px-4 py-3 text-left last:border-b-0 hover:bg-slate-50"
                type="button"
                onClick={() => {
                  onChange(suggestion.label)
                  setOpen(false)
                }}
              >
                <p className="font-medium text-black">{suggestion.city}</p>
                <p className="text-sm text-slate-500">
                  {suggestion.state}, {suggestion.country}
                </p>
              </button>
            ))}
        </div>
      ) : null}
    </div>
  )
}
