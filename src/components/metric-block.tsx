import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { StockMetric, StockData } from '@/lib/api';
import type { Language } from '@/lib/i18n';
import { formatValue, getChangeValueColor } from '@/lib/format';
import { cn } from '@/lib/utils';

interface MetricBlockProps {
  titleKey: keyof StockData;
  metrics: StockMetric[];
}

export function MetricBlock({ titleKey, metrics }: MetricBlockProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as Language;
  const displayTitle = t(`blocks.${titleKey}`);

  const primaryMetrics = metrics.filter((m) => m.is_primary);
  const secondaryMetrics = metrics.filter((m) => !m.is_primary);

  if (primaryMetrics.length === 0 && secondaryMetrics.length === 0) {
    return null;
  }

  return (
    <Card className="w-full min-w-0 gap-4 py-4">
      <CardHeader className="px-4 py-0">
        <CardTitle className="text-base sm:text-lg wrap-break-word">
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-0 space-y-4">
        {primaryMetrics.length > 0 && (
          <div className="space-y-2">
            {primaryMetrics.map((metric) => (
              <MetricRow
                key={metric.key}
                metric={metric}
                language={language}
                isPrimary
              />
            ))}
          </div>
        )}
        {secondaryMetrics.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-border/50">
            {secondaryMetrics.map((metric) => (
              <MetricRow
                key={metric.key}
                metric={metric}
                language={language}
                isPrimary={false}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface MetricRowProps {
  metric: StockMetric;
  language: Language;
  isPrimary: boolean;
}

function MetricRow({ metric, language, isPrimary }: MetricRowProps) {
  const label = language === 'uk' ? metric.label_uk : metric.label_en;
  const value = formatValue(metric.value, metric.key);
  const valueColor = getChangeValueColor(metric.key, metric.value);

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2',
        isPrimary ? 'text-sm' : 'text-xs'
      )}
    >
      <span
        className={cn(
          'wrap-break-word min-w-0 flex-1',
          isPrimary ? 'text-foreground font-medium' : 'text-muted-foreground'
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'text-right shrink-0 tabular-nums',
          isPrimary ? 'font-semibold' : 'font-medium',
          valueColor || (isPrimary ? 'text-foreground' : 'text-muted-foreground')
        )}
      >
        {value}
      </span>
    </div>
  );
}
