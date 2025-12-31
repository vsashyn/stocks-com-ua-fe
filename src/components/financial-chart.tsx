import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  ReferenceLine,
} from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatAxisValue, formatLargeNumber } from '@/lib/format-utils'

interface ChartDataPoint {
  period: string
  value: number
}

interface FinancialChartProps {
  title: string
  description?: string
  data: ChartDataPoint[]
  color?: string
  positiveColor?: string
  negativeColor?: string
  showNegativeColors?: boolean
  className?: string
}

export function FinancialChart({
  title,
  description,
  data,
  color = 'var(--chart-1)',
  positiveColor = 'var(--chart-2)',
  negativeColor = 'var(--destructive)',
  showNegativeColors = false,
  className,
}: FinancialChartProps) {
  const chartConfig = {
    value: {
      label: title,
      color: color,
    },
  } satisfies ChartConfig

  const hasNegativeValues = data.some((d) => d.value < 0)

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base md:text-lg">{title}</CardTitle>
        {description && (
          <CardDescription className="text-xs md:text-sm">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="px-2 pb-4 md:px-4">
        <ChartContainer config={chartConfig} className="h-[200px] w-full md:h-[280px]">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
              interval="preserveStartEnd"
              tick={{ fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
              tickFormatter={formatAxisValue}
              width={50}
              tick={{ fill: 'var(--color-muted-foreground)' }}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--color-muted)', opacity: 0.3 }}
              content={
                <ChartTooltipContent
                  formatter={(value) => (
                    <span className="font-mono">{formatLargeNumber(value as number)}</span>
                  )}
                />
              }
            />
            {hasNegativeValues && (
              <ReferenceLine y={0} stroke="var(--color-border)" />
            )}
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={50}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    showNegativeColors
                      ? entry.value >= 0
                        ? positiveColor
                        : negativeColor
                      : color
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

