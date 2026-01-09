import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Search, Loader2 } from 'lucide-react'

interface StockSearchProps {
  onSearch: (ticker: string) => Promise<void>
  isLoading?: boolean
  error?: string | null
  className?: string
}

export function StockSearch({
  onSearch,
  isLoading = false,
  error,
  className,
}: StockSearchProps) {
  const [ticker, setTicker] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (ticker.trim() && !isLoading) {
      await onSearch(ticker.trim().toUpperCase())
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && ticker.trim() && !isLoading) {
      e.preventDefault()
      onSearch(ticker.trim().toUpperCase())
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter stock ticker (e.g., AAPL, MSFT, GOOGL)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="pl-9 h-11 text-base uppercase"
            aria-label="Stock ticker symbol"
          />
        </div>
        <Button 
          type="submit" 
          disabled={!ticker.trim() || isLoading}
          className="h-11 px-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            'Search'
          )}
        </Button>
      </form>
      {error && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
