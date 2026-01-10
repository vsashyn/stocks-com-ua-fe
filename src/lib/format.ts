export function formatLargeNumber(num: number | string | null): string {
  if (num === null || num === undefined) return 'N/A';

  const value = typeof num === 'string' ? parseFloat(num) : num;

  if (isNaN(value)) return 'N/A';

  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;

  return `$${value.toFixed(2)}`;
}

export function formatPrice(price: number | string | null): string {
  if (price === null || price === undefined) return 'N/A';

  const value = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(value)) return 'N/A';

  return `$${value.toFixed(2)}`;
}

export function formatPercent(percent: number | string | null): string {
  if (percent === null || percent === undefined) return 'N/A';

  if (typeof percent === 'string') {
    if (percent.includes('%')) return percent;
    const value = parseFloat(percent);
    if (isNaN(value)) return 'N/A';
    return `${value.toFixed(2)}%`;
  }

  return `${percent.toFixed(2)}%`;
}

export function formatRatio(ratio: number | string | null): string {
  if (ratio === null || ratio === undefined) return 'N/A';

  const value = typeof ratio === 'string' ? parseFloat(ratio) : ratio;

  if (isNaN(value)) return 'N/A';

  return value.toFixed(2);
}

export function formatValue(
  value: number | string | null,
  key: string
): string {
  if (value === null || value === undefined) return 'N/A';

  const priceKeys = [
    'Price',
    'ClosePrice',
    'PriceDifference',
    '52WeekHigh',
    '52WeekLow',
    '50DayMovingAverage',
    '200DayMovingAverage',
    'EPS',
    'BookValue',
    'DividendPerShare',
  ];
  const percentKeys = [
    'ChangePercent',
    'DividendYield',
    'PayoutRatio',
    'ProfitMargin',
    'OperatingMarginTTM',
    'ReturnOnAssetsTTM',
    'ReturnOnEquityTTM',
    'GrossProfitTTM',
    'RevenueGrowth',
    'EarningsGrowth',
  ];
  const largeNumberKeys = [
    'MarketCapitalization',
    'EBITDA',
    'RevenueTTM',
    'GrossProfitTTM',
    'TotalRevenue',
    'TotalDebt',
    'TotalCash',
    'TotalAssets',
    'TotalLiabilities',
    'SharesOutstanding',
  ];
  const ratioKeys = [
    'PERatio',
    'ForwardPE',
    'PEGRatio',
    'PriceToSalesRatioTTM',
    'PriceToBookRatio',
    'EVToRevenue',
    'EVToEBITDA',
    'DebtToEquity',
    'CurrentRatio',
    'QuickRatio',
    'Beta',
  ];

  if (priceKeys.includes(key)) {
    return formatPrice(value);
  }

  if (percentKeys.includes(key)) {
    return formatPercent(value);
  }

  if (largeNumberKeys.includes(key)) {
    return formatLargeNumber(value);
  }

  if (ratioKeys.includes(key)) {
    return formatRatio(value);
  }

  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toLocaleString();

  return String(value);
}
