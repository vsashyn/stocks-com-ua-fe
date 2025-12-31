import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Metric {
  label: string
  value: string
  subValue?: string
}

interface KeyMetricsGridProps {
  metrics: Metric[]
  className?: string
}

export function KeyMetricsGrid({ metrics, className }: KeyMetricsGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6', className)}>
      {metrics.map((metric) => (
        <Card key={metric.label} className="overflow-hidden">
          <CardContent className="p-3 md:p-4">
            <p className="text-xs text-muted-foreground truncate">{metric.label}</p>
            <p className="text-lg font-bold font-mono text-foreground md:text-xl">
              {metric.value}
            </p>
            {metric.subValue && (
              <p className="text-xs text-muted-foreground">{metric.subValue}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

