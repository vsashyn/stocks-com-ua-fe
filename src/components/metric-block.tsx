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
    <div className="rounded-lg border bg-card w-full min-w-0">
      <div className="border-b px-2 py-2.5 sm:px-3 sm:py-3">
        <h3 className="text-base sm:text-lg font-semibold text-foreground break-words">
          {displayTitle}
        </h3>
      </div>
      <div className="p-2 sm:p-3 w-full min-w-0">
        <MetricTable metrics={metrics} language={language} />
      </div>
    </div>
  );
}
