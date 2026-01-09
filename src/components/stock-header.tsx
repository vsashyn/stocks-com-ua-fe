import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  type StockMetric,
  getMetricValue,
  formatPrice,
  formatLargeNumber,
  formatPercentChange,
} from '@/lib/stock-api'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StockHeaderProps {
  ticker: string
  marketSummary: StockMetric[]
  className?: string
}

export function StockHeader({
  ticker,
  marketSummary,
  className,
}: StockHeaderProps) {
  const price = getMetricValue(marketSummary, 'Price')
  const priceDiff = getMetricValue(marketSummary, 'PriceDifference')
  const changePercent = getMetricValue(marketSummary, 'ChangePercent')
  const marketCap = getMetricValue(marketSummary, 'MarketCapitalization')
  const sector = getMetricValue(marketSummary, 'Sector')
  const industry = getMetricValue(marketSummary, 'Industry')

  const numericDiff = typeof priceDiff === 'number' ? priceDiff : parseFloat(String(priceDiff || '0'))
  const isPositive = !isNaN(numericDiff) && numericDiff >= 0

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl md:h-16 md:w-16 md:text-2xl">
              {ticker.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground md:text-2xl">
                  {ticker}
                </h1>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 flex-wrap">
                {sector && <span>{String(sector)}</span>}
                {sector && industry && <span>•</span>}
                {industry && <span>{String(industry)}</span>}
              </div>
            </div>
          </div>
          
          <div className="flex gap-6 md:gap-8">
            <div className="text-left md:text-right">
              <p className="text-sm text-muted-foreground">Price</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold font-mono text-foreground md:text-3xl">
                  {formatPrice(price)}
                </p>
                <div className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )}>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>
                    {priceDiff !== null && (
                      <>
                        {isPositive ? '+' : ''}${Math.abs(numericDiff).toFixed(2)}
                      </>
                    )}
                  </span>
                  <span>({formatPercentChange(changePercent)})</span>
                </div>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-2xl font-bold font-mono text-foreground md:text-3xl">
                {formatLargeNumber(marketCap)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
