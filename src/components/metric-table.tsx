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
            <TableCell className="font-medium text-muted-foreground">
              {language === 'uk' ? metric.label_uk : metric.label_en}
            </TableCell>
            <TableCell
              className={cn(
                'text-right font-semibold',
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
