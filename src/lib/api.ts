const API_BASE_URL = 'https://stocks.com.ua/api/v1';
const API_TOKEN: string =
  (import.meta.env.VITE_API_TOKEN as string | undefined) ||
  '7Uk2dDCmo8H0xmD0rPqJlSZpXH3R1M';

export interface StockMetric {
  key: string;
  value: number | string | null;
  block: string;
  label_en: string;
  label_uk: string;
  is_primary: boolean;
}

export interface StockData {
  market_summary: StockMetric[];
  valuation: StockMetric[];
  profitability: StockMetric[];
  dividends: StockMetric[];
  forecasts: StockMetric[];
  balance_sheet: StockMetric[];
  financial_health: StockMetric[];
}

export interface StockApiResponse {
  success: boolean;
  ticker: string;
  data: StockData;
  message?: string;
}

export const BLOCK_TITLES: Record<keyof StockData, { en: string; uk: string }> =
  {
    market_summary: { en: 'Market Summary', uk: 'Ринкові дані' },
    valuation: { en: 'Valuation', uk: 'Оцінка вартості' },
    profitability: { en: 'Profitability', uk: 'Прибутковість' },
    dividends: { en: 'Dividends', uk: 'Дивіденди' },
    forecasts: { en: 'Forecasts', uk: 'Прогнози' },
    balance_sheet: { en: 'Balance Sheet', uk: 'Баланс' },
    financial_health: { en: 'Financial Health', uk: "Фінансове здоров'я" },
  };

export async function fetchStockData(
  ticker: string
): Promise<StockApiResponse> {
  const response = await fetch(`${API_BASE_URL}/ticker`, {
    method: 'POST',
    headers: {
      'X-API-Token': API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ticker: ticker.toUpperCase() }),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as {
      message?: string;
    };
    throw new Error(
      errorData.message || `API request failed with status ${response.status}`
    );
  }

  return response.json() as Promise<StockApiResponse>;
}
