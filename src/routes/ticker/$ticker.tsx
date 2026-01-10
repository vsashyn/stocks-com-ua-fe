import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { fetchStockData, BLOCK_TITLES } from '@/lib/api';
import type { StockData } from '@/lib/api';
import { MetricBlock } from '@/components/metric-block';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/ticker/$ticker')({
  loader: async ({ params }) => {
    const data = await fetchStockData(params.ticker);
    return data;
  },
  component: TickerPage,
});

const BLOCK_ORDER: (keyof StockData)[] = [
  'market_summary',
  'valuation',
  'profitability',
  'dividends',
  'forecasts',
  'balance_sheet',
  'financial_health',
];

function TickerPage() {
  const { ticker } = Route.useParams();
  const { data } = Route.useLoaderData();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen p-4 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">{ticker}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {BLOCK_ORDER.map((blockKey) => {
            const metrics = data[blockKey];
            if (!metrics || metrics.length === 0) return null;

            return (
              <MetricBlock
                key={blockKey}
                title={BLOCK_TITLES[blockKey]}
                metrics={metrics}
                language={language}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
