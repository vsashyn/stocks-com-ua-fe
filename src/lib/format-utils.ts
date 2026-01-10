/**
 * Format a large number into a human-readable string with suffix (B, M, K)
 */
export function formatLargeNumber(
  value: number | string | null | undefined
): string {
  if (value === null || value === undefined || value === 'None') {
    return 'N/A';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return 'N/A';
  }

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= 1e12) {
    return `${sign}$${(absNum / 1e12).toFixed(2)}T`;
  }
  if (absNum >= 1e9) {
    return `${sign}$${(absNum / 1e9).toFixed(2)}B`;
  }
  if (absNum >= 1e6) {
    return `${sign}$${(absNum / 1e6).toFixed(2)}M`;
  }
  if (absNum >= 1e3) {
    return `${sign}$${(absNum / 1e3).toFixed(2)}K`;
  }

  return `${sign}$${absNum.toFixed(2)}`;
}

/**
 * Format a number for chart axis labels (shorter format)
 */
export function formatAxisValue(value: number): string {
  const absNum = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absNum >= 1e12) {
    return `${sign}${(absNum / 1e12).toFixed(1)}T`;
  }
  if (absNum >= 1e9) {
    return `${sign}${(absNum / 1e9).toFixed(1)}B`;
  }
  if (absNum >= 1e6) {
    return `${sign}${(absNum / 1e6).toFixed(1)}M`;
  }
  if (absNum >= 1e3) {
    return `${sign}${(absNum / 1e3).toFixed(0)}K`;
  }

  return `${sign}${absNum.toFixed(0)}`;
}

/**
 * Format percentage value
 */
export function formatPercentage(
  value: number | string | null | undefined
): string {
  if (value === null || value === undefined || value === 'None') {
    return 'N/A';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return 'N/A';
  }

  return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
}

/**
 * Parse a fiscal date string to get the year
 */
export function getFiscalYear(dateString: string): string {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

/**
 * Parse a fiscal date string to get quarter and year
 */
export function getFiscalQuarter(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth();
  const year = date.getFullYear();

  let quarter: string;
  if (month >= 0 && month <= 2) quarter = 'Q1';
  else if (month >= 3 && month <= 5) quarter = 'Q2';
  else if (month >= 6 && month <= 8) quarter = 'Q3';
  else quarter = 'Q4';

  return `${quarter} ${year}`;
}

/**
 * Parse numeric value from string, handling "None" values
 */
export function parseNumericValue(
  value: string | number | null | undefined
): number {
  if (value === null || value === undefined || value === 'None') {
    return 0;
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(num) ? 0 : num;
}
