import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { StockMetric } from '@/lib/api';
import { formatValue } from '@/lib/format';
import type { Language } from '@/hooks/use-language';
import { cn } from '@/lib/utils';

interface MetricTableProps {
  metrics: StockMetric[];
  language: Language;
}

export function MetricTable({ metrics, language }: MetricTableProps) {
  if (!metrics.length) {
    return (
      <p className="text-sm text-muted-foreground">
        {language === 'uk' ? 'Дані недоступні' : 'No data available'}
      </p>
    );
  }

  return (
    <Table>
      <TableBody>
        {metrics.map((metric) => (
          <TableRow key={metric.key}>
            <TableCell className="w-[60%] px-2 py-2.5 font-medium text-muted-foreground sm:px-3 break-words text-sm">
              {language === 'uk' ? metric.label_uk : metric.label_en}
            </TableCell>
            <TableCell
              className={cn(
                'w-[40%] px-2 py-2.5 text-right font-semibold sm:px-3 break-words text-sm',
                isChangeValue(metric.key, metric.value)
              )}
            >
              {formatValue(metric.value, metric.key)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function isChangeValue(key: string, value: number | string | null): string {
  if (value === null || value === undefined) return '';

  const changeKeys = ['PriceDifference', 'ChangePercent'];
  if (!changeKeys.includes(key)) return '';

  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '';

  return numValue >= 0 ? 'text-chart-1' : 'text-destructive';
}
