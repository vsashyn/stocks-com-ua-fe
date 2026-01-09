import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { StockHeader } from '@/components/stock-header'
import { KeyMetricsGrid } from '@/components/key-metrics-grid'
import { FinancialChart } from '@/components/financial-chart'
import { StockSearch } from '@/components/stock-search'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useStockData } from '@/hooks/use-stock-data'
import { getMetricValue } from '@/lib/stock-api'
import { TrendingUp, Info, AlertCircle } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: StockDashboard,
})

const sampleRevenueData = [
  { period: '2019', value: 260174000000 },
  { period: '2020', value: 274515000000 },
  { period: '2021', value: 365817000000 },
  { period: '2022', value: 394328000000 },
  { period: '2023', value: 383285000000 },
]

const sampleNetIncomeData = [
  { period: '2019', value: 55256000000 },
  { period: '2020', value: 57411000000 },
  { period: '2021', value: 94680000000 },
  { period: '2022', value: 99803000000 },
  { period: '2023', value: 96995000000 },
]

const sampleFreeCashFlowData = [
  { period: '2019', value: 58896000000 },
  { period: '2020', value: 73365000000 },
  { period: '2021', value: 92953000000 },
  { period: '2022', value: 111443000000 },
  { period: '2023', value: 99584000000 },
]

function StockDashboard() {
  const [viewMode, setViewMode] = useState<'annual' | 'quarterly'>('annual')
  const { data, isLoading, error, searchTicker } = useStockData()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-semibold text-foreground">
            Stock Dashboard
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <section className="w-full max-w-2xl mx-auto">
          <StockSearch
            onSearch={searchTicker}
            isLoading={isLoading}
            error={error}
          />
        </section>

        {!data && !isLoading && !error && (
          <EmptyState />
        )}

        {error && !isLoading && (
          <TickerNotFoundError message={error} />
        )}

        {data && (
          <>
            <StockHeader
              ticker={data.ticker}
              marketSummary={data.data.market_summary}
            />

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Market Summary</h2>
              <KeyMetricsGrid metrics={data.data.market_summary} />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Valuation</h2>
              <KeyMetricsGrid metrics={data.data.valuation} />
            </section>

            <section>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">Financial Performance</h2>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    <Info className="h-3 w-3" />
                    <span>Sample Data</span>
                  </div>
                </div>
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'annual' | 'quarterly')}>
                  <TabsList>
                    <TabsTrigger value="annual">Annual</TabsTrigger>
                    <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Card className="mb-4 border-dashed">
                <CardContent className="py-3 px-4">
                  <p className="text-sm text-muted-foreground">
                    Historical financial data (Revenue, Net Income, Free Cash Flow) is displayed as sample data. 
                    The current API provides real-time market metrics only.
                  </p>
                </CardContent>
              </Card>

              <Tabs value={viewMode} className="space-y-4">
                <TabsContent value="annual" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <FinancialChart
                      title="Revenue"
                      description="Total annual revenue"
                      data={sampleRevenueData}
                      color="var(--chart-1)"
                    />
                    <FinancialChart
                      title="Net Income"
                      description="Annual net profit/loss"
                      data={sampleNetIncomeData}
                      color="var(--chart-2)"
                      showNegativeColors
                      positiveColor="var(--chart-2)"
                      negativeColor="var(--destructive)"
                    />
                    <FinancialChart
                      title="Free Cash Flow"
                      description="Operating cash flow minus CapEx"
                      data={sampleFreeCashFlowData}
                      showNegativeColors
                      positiveColor="var(--chart-3)"
                      negativeColor="var(--destructive)"
                      className="md:col-span-2 lg:col-span-1"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="quarterly" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <FinancialChart
                      title="Revenue"
                      description="Quarterly revenue"
                      data={sampleRevenueData}
                      color="var(--chart-1)"
                    />
                    <FinancialChart
                      title="Net Income"
                      description="Quarterly net profit/loss"
                      data={sampleNetIncomeData}
                      color="var(--chart-2)"
                      showNegativeColors
                      positiveColor="var(--chart-2)"
                      negativeColor="var(--destructive)"
                    />
                    <FinancialChart
                      title="Free Cash Flow"
                      description="Operating cash flow minus CapEx"
                      data={sampleFreeCashFlowData}
                      showNegativeColors
                      positiveColor="var(--chart-3)"
                      negativeColor="var(--destructive)"
                      className="md:col-span-2 lg:col-span-1"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <QuickStatCard
                  label="52 Week High"
                  value={formatPriceValue(getMetricValue(data.data.market_summary, '52WeekHigh'))}
                />
                <QuickStatCard
                  label="52 Week Low"
                  value={formatPriceValue(getMetricValue(data.data.market_summary, '52WeekLow'))}
                />
                <QuickStatCard
                  label="50 Day MA"
                  value={formatPriceValue(getMetricValue(data.data.market_summary, '50DayMovingAverage'))}
                />
                <QuickStatCard
                  label="200 Day MA"
                  value={formatPriceValue(getMetricValue(data.data.market_summary, '200DayMovingAverage'))}
                />
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="border-t py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Data provided by stocks.com.ua API • For informational purposes only
        </div>
      </footer>
    </div>
  )
}

function EmptyState() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Stock Dashboard</CardTitle>
        <CardDescription className="text-base">
          Enter a stock ticker symbol above to view real-time market data, 
          valuation metrics, and financial performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
          <span>Try:</span>
          <code className="bg-muted px-2 py-0.5 rounded">AAPL</code>
          <code className="bg-muted px-2 py-0.5 rounded">MSFT</code>
          <code className="bg-muted px-2 py-0.5 rounded">GOOGL</code>
          <code className="bg-muted px-2 py-0.5 rounded">AMZN</code>
          <code className="bg-muted px-2 py-0.5 rounded">TSLA</code>
        </div>
      </CardContent>
    </Card>
  )
}

function TickerNotFoundError({ message }: { message: string }) {
  return (
    <Card className="max-w-2xl mx-auto border-destructive/50">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <CardTitle className="text-2xl text-destructive">Ticker Not Found</CardTitle>
        <CardDescription className="text-base">
          {message}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
          <span>Try searching for:</span>
          <code className="bg-muted px-2 py-0.5 rounded">AAPL</code>
          <code className="bg-muted px-2 py-0.5 rounded">MSFT</code>
          <code className="bg-muted px-2 py-0.5 rounded">GOOGL</code>
          <code className="bg-muted px-2 py-0.5 rounded">AMZN</code>
          <code className="bg-muted px-2 py-0.5 rounded">TSLA</code>
        </div>
      </CardContent>
    </Card>
  )
}

interface QuickStatCardProps {
  label: string
  value: string
}

function QuickStatCard({ label, value }: QuickStatCardProps) {
  return (
    <div className="rounded-lg bg-muted p-4 text-center">
      <p className="text-2xl font-bold font-mono text-foreground">
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function formatPriceValue(value: string | number | null): string {
  if (value === null || value === undefined) return 'N/A'
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(numValue)) return 'N/A'
  return `$${numValue.toFixed(2)}`
}
