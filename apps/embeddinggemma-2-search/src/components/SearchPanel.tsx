import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input.tsx'

export function SearchPanel({
  query,
  onQuery,
  disabled,
  searching,
}: {
  query: string
  onQuery: (value: string) => void
  disabled: boolean
  searching: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="library-search" className="text-sm font-medium">
        Search
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="library-search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          disabled={disabled}
          placeholder={disabled ? 'Loading the model…' : 'Try dog on a beach'}
          className="pl-9"
          autoComplete="off"
        />
      </div>
      <p className="min-h-5 text-xs text-muted-foreground">
        {searching ? 'Embedding the query…' : 'Ranks every photo and note by cosine similarity.'}
      </p>
    </div>
  )
}
