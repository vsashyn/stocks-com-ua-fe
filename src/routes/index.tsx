import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { StockHeader } from '@/components/stock-header'
import { KeyMetricsGrid } from '@/components/key-metrics-grid'
import { FinancialChart } from '@/components/financial-chart'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  parseOverview,
  getRevenueChartData,
  getNetIncomeChartData,
  getFreeCashFlowChartData,
  type StockPayload,
} from '@/lib/stock-data'

// Import the sample data
import stockData from '../../docs/payload-example.json'

export const Route = createFileRoute('/')({
  component: StockDashboard,
})

function StockDashboard() {
  const [viewMode, setViewMode] = useState<'annual' | 'quarterly'>('annual')
  const data = stockData as StockPayload

  const overview = parseOverview(data.overview)
  const isQuarterly = viewMode === 'quarterly'

  const revenueData = getRevenueChartData(
    isQuarterly
      ? data.incomeStatement.quarterlyReports
      : data.incomeStatement.annualReports,
    isQuarterly
  )

  const netIncomeData = getNetIncomeChartData(
    isQuarterly
      ? data.incomeStatement.quarterlyReports
      : data.incomeStatement.annualReports,
    isQuarterly
  )

  const freeCashFlowData = getFreeCashFlowChartData(
    isQuarterly
      ? data.cashFlow.quarterlyReports
      : data.cashFlow.annualReports,
    isQuarterly
  )

  const metrics = [
    { label: 'P/E Ratio', value: overview.peRatio, subValue: `Fwd: ${overview.forwardPE}` },
    { label: 'PEG Ratio', value: overview.pegRatio },
    { label: 'P/S Ratio', value: overview.priceToSales },
    { label: 'P/B Ratio', value: overview.priceToBook },
    { label: 'ROE', value: overview.roe },
    { label: 'ROA', value: overview.roa },
    { label: 'Profit Margin', value: overview.profitMargin },
    { label: 'Operating Margin', value: overview.operatingMargin },
    { label: 'EPS', value: `$${overview.eps}` },
    { label: 'Dividend Yield', value: overview.dividendYield },
    { label: 'Beta', value: overview.beta },
    { label: '52W Range', value: overview.week52Range },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-semibold text-foreground">
            Stock Dashboard
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stock Header */}
        <StockHeader
          symbol={data.incomeStatement.symbol}
          companyName={overview.companyName}
          currentPrice={overview.currentPrice}
          marketCap={overview.marketCap}
          sector={overview.sector}
          country={overview.country}
        />

        {/* Key Metrics */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Key Metrics</h2>
          <KeyMetricsGrid metrics={metrics} />
        </section>

        {/* Financial Charts */}
        <section>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Financial Performance</h2>
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'annual' | 'quarterly')}>
              <TabsList>
                <TabsTrigger value="annual">Annual</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Tabs value={viewMode} className="space-y-4">
            <TabsContent value="annual" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <FinancialChart
                  title="Revenue"
                  description="Total annual revenue"
                  data={revenueData}
                  color="var(--chart-1)"
                />
                <FinancialChart
                  title="Net Income"
                  description="Annual net profit/loss"
                  data={netIncomeData}
                  color="var(--chart-2)"
                  showNegativeColors
                  positiveColor="var(--chart-2)"
                  negativeColor="var(--destructive)"
                />
                <FinancialChart
                  title="Free Cash Flow"
                  description="Operating cash flow minus CapEx"
                  data={freeCashFlowData}
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
                  data={revenueData}
                  color="var(--chart-1)"
                />
                <FinancialChart
                  title="Net Income"
                  description="Quarterly net profit/loss"
                  data={netIncomeData}
                  color="var(--chart-2)"
                  showNegativeColors
                  positiveColor="var(--chart-2)"
                  negativeColor="var(--destructive)"
                />
                <FinancialChart
                  title="Free Cash Flow"
                  description="Operating cash flow minus CapEx"
                  data={freeCashFlowData}
                  showNegativeColors
                  positiveColor="var(--chart-3)"
                  negativeColor="var(--destructive)"
                  className="md:col-span-2 lg:col-span-1"
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Analyst Ratings */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Analyst Summary</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold font-mono text-foreground">
                ${overview.targetPrice}
              </p>
              <p className="text-xs text-muted-foreground">Target Price</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold font-mono text-foreground">
                {overview.revenueGrowth}
              </p>
              <p className="text-xs text-muted-foreground">Revenue Growth</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold font-mono text-foreground">
                {overview.earningsGrowth}
              </p>
              <p className="text-xs text-muted-foreground">Earnings Growth</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold font-mono text-foreground">
                {overview.institutionalOwnership}
              </p>
              <p className="text-xs text-muted-foreground">Institutional Own.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Data provided for informational purposes only
        </div>
      </footer>
    </div>
  )
}
