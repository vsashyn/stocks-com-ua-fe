import { useState, useCallback } from 'react'
import { fetchStockData, type StockAPIResponse } from '@/lib/stock-api'

interface UseStockDataReturn {
  data: StockAPIResponse | null
  isLoading: boolean
  error: string | null
  searchTicker: (ticker: string) => Promise<void>
  clearData: () => void
}

export function useStockData(): UseStockDataReturn {
  const [data, setData] = useState<StockAPIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchTicker = useCallback(async (ticker: string) => {
    if (!ticker.trim()) {
      setError('Please enter a ticker symbol')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetchStockData(ticker)
      setData(response)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(message)
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearData = useCallback(() => {
    setData(null)
    setError(null)
  }, [])

  return {
    data,
    isLoading,
    error,
    searchTicker,
    clearData,
  }
}
