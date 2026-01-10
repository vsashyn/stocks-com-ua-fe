import { MetricTable } from '@/components/metric-table';
import type { StockMetric } from '@/lib/api';
import type { Language } from '@/hooks/use-language';

interface MetricBlockProps {
  title: { en: string; uk: string };
  metrics: StockMetric[];
  language: Language;
}

export function MetricBlock({ title, metrics, language }: MetricBlockProps) {
  const displayTitle = language === 'uk' ? title.uk : title.en;

  return (
    <div className="rounded-lg border bg-card">
      <div className="border-b px-4 py-3">
        <h3 className="text-lg font-semibold text-foreground">
          {displayTitle}
        </h3>
      </div>
      <div className="p-4">
        <MetricTable metrics={metrics} language={language} />
      </div>
    </div>
  );
}
