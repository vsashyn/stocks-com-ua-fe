import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  type StockMetric,
  getPrimaryMetrics,
  getExtendedMetrics,
  formatMetricValue,
} from '@/lib/stock-api'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface KeyMetricsGridProps {
  metrics: StockMetric[]
  title?: string
  className?: string
}

export function KeyMetricsGrid({ metrics, title, className }: KeyMetricsGridProps) {
  const [showExtended, setShowExtended] = useState(false)
  
  const primaryMetrics = getPrimaryMetrics(metrics)
  const extendedMetrics = getExtendedMetrics(metrics)
  const hasExtended = extendedMetrics.length > 0

  return (
    <div className={cn('space-y-3', className)}>
      {title && (
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      )}
      
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {primaryMetrics.map((metric) => (
          <MetricCard key={metric.key} metric={metric} />
        ))}
      </div>

      {hasExtended && (
        <>
          {showExtended && (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {extendedMetrics.map((metric) => (
                <MetricCard key={metric.key} metric={metric} />
              ))}
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExtended(!showExtended)}
            className="w-full text-muted-foreground hover:text-foreground"
          >
            {showExtended ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Show {extendedMetrics.length} More
              </>
            )}
          </Button>
        </>
      )}
    </div>
  )
}

interface MetricCardProps {
  metric: StockMetric
}

function MetricCard({ metric }: MetricCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3 md:p-4">
        <p className="text-xs text-muted-foreground truncate" title={metric.label_en}>
          {metric.label_en}
        </p>
        <p className="text-lg font-bold font-mono text-foreground md:text-xl">
          {formatMetricValue(metric)}
        </p>
      </CardContent>
    </Card>
  )
}
