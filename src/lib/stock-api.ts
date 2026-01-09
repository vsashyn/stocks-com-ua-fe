// Types for the stocks.com.ua API response

export interface StockMetric {
  key: string
  value: string | number | null
  block: string
  label_en: string
  label_uk: string
  is_primary: boolean
}

export interface StockAPIData {
  market_summary: StockMetric[]
  valuation: StockMetric[]
}

export interface StockAPIResponse {
  success: boolean
  ticker: string
  data: StockAPIData
}

export interface StockAPIError {
  success: false
  message: string
  errors?: Record<string, string[]>
}

// Helper function to get metric by key
export function getMetricByKey(
  metrics: StockMetric[],
  key: string
): StockMetric | undefined {
  return metrics.find((m) => m.key === key)
}

// Helper function to get metric value
export function getMetricValue(
  metrics: StockMetric[],
  key: string
): string | number | null {
  return getMetricByKey(metrics, key)?.value ?? null
}

// Filter primary metrics
export function getPrimaryMetrics(metrics: StockMetric[]): StockMetric[] {
  return metrics.filter((m) => m.is_primary)
}

// Filter extended (non-primary) metrics
export function getExtendedMetrics(metrics: StockMetric[]): StockMetric[] {
  return metrics.filter((m) => !m.is_primary)
}

// Format large numbers (market cap, etc.)
export function formatLargeNumber(num: number | string | null): string {
  if (num === null || num === undefined) return 'N/A'
  
  const value = typeof num === 'string' ? parseFloat(num) : num
  if (isNaN(value)) return 'N/A'
  
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`
  return `$${value.toFixed(2)}`
}

// Format price with $ symbol
export function formatPrice(price: number | string | null): string {
  if (price === null || price === undefined) return 'N/A'
  const value = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(value)) return 'N/A'
  return `$${value.toFixed(2)}`
}

// Format percentage change
export function formatPercentChange(value: string | number | null): string {
  if (value === null || value === undefined) return 'N/A'
  // If it's already a string with %, return as is
  if (typeof value === 'string' && value.includes('%')) return value
  // Otherwise format as percentage
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(numValue)) return 'N/A'
  const sign = numValue >= 0 ? '+' : ''
  return `${sign}${numValue.toFixed(2)}%`
}

// Format metric value based on its key
export function formatMetricValue(metric: StockMetric): string {
  const { key, value } = metric
  
  if (value === null || value === undefined) return 'N/A'
  
  // Price-related fields
  if (['Price', 'ClosePrice', '52WeekHigh', '52WeekLow', '50DayMovingAverage', '200DayMovingAverage'].includes(key)) {
    return formatPrice(value)
  }
  
  // Market cap
  if (key === 'MarketCapitalization') {
    return formatLargeNumber(value)
  }
  
  // Percentage fields
  if (key === 'ChangePercent') {
    return formatPercentChange(value)
  }
  
  // Price difference
  if (key === 'PriceDifference') {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    if (typeof numValue === 'number' && !isNaN(numValue)) {
      const sign = numValue >= 0 ? '+' : ''
      return `${sign}$${Math.abs(numValue).toFixed(2)}`
    }
  }
  
  // Ratio fields - display as-is with 2 decimal places
  if (['PERatio', 'ForwardPE', 'PEGRatio', 'PriceToSalesRatioTTM', 'PriceToBookRatio', 'EVToRevenue', 'EVToEBITDA'].includes(key)) {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    if (typeof numValue === 'number' && !isNaN(numValue)) {
      return numValue.toFixed(2)
    }
  }
  
  // Default: return as string
  return String(value)
}

// API Client
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://stocks.com.ua/api/v1'
const API_TOKEN = import.meta.env.VITE_API_TOKEN

export async function fetchStockData(ticker: string): Promise<StockAPIResponse> {
  if (!API_TOKEN) {
    throw new Error('API token is not configured. Please set VITE_API_TOKEN in your .env file.')
  }
  
  const response = await fetch(`${API_BASE_URL}/ticker`, {
    method: 'POST',
    headers: {
      'X-API-Token': API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ticker: ticker.toUpperCase() }),
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    const errorData = data as StockAPIError
    throw new Error(errorData.message || `Failed to fetch data for ${ticker}`)
  }
  
  if (!data.success) {
    throw new Error(data.message || `Failed to fetch data for ${ticker}`)
  }
  
  return data as StockAPIResponse
}
