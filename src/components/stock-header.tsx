import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StockHeaderProps {
  symbol: string
  companyName: string
  currentPrice: string
  marketCap: string
  sector: string
  country: string
  className?: string
}

export function StockHeader({
  symbol,
  companyName,
  currentPrice,
  marketCap,
  sector,
  country,
  className,
}: StockHeaderProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl md:h-16 md:w-16 md:text-2xl">
              {symbol.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground md:text-2xl">
                  {companyName}
                </h1>
                <span className="rounded-md bg-muted px-2 py-1 text-sm font-mono text-muted-foreground">
                  {symbol}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span>{sector}</span>
                <span>•</span>
                <span>{country}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-6 md:gap-8">
            <div className="text-left md:text-right">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-2xl font-bold font-mono text-foreground md:text-3xl">
                ${currentPrice}
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-2xl font-bold font-mono text-foreground md:text-3xl">
                {marketCap}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

